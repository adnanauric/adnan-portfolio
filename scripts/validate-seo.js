import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { seoTags } from './seo.js';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const html = read('dist/index.html');
const { meta } = JSON.parse(read('content/site-config.json'));
const canonical = 'https://adnanabir.com/';
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const tags = [...html.matchAll(/<(meta|link)\b[^>]*>/g)].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [name, decode(value)])));

assert.equal(meta.canonical, canonical);
assert.equal((html.match(/<title>/g) || []).length, 1, 'Exactly one title');
assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)[1]), meta.title);
for (const tag of seoTags().filter(({ tag }) => tag === 'meta' || tag === 'link')) {
  const key = tag.attrs.name ? 'name' : tag.attrs.property ? 'property' : 'rel';
  const matches = tags.filter((candidate) => candidate[key] === tag.attrs[key]);
  assert.equal(matches.length, 1, `No missing/duplicate ${tag.attrs[key]}`);
  for (const [name, value] of Object.entries(tag.attrs)) assert.equal(matches[0][name], String(value));
}
assert(!tags.some(tag => /robots/i.test(tag.name || '') && /noindex|nofollow|none/i.test(tag.content)), 'Indexing allowed');
assert(!tags.some(tag => tag.name === 'keywords'), 'No keyword meta tag');
assert.equal(tags.find(tag => tag.rel === 'canonical').href, canonical);

const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
assert.equal(scripts.length, 1, 'One non-conflicting JSON-LD graph');
const schema = JSON.parse(scripts[0][1]);
assert.equal(schema['@context'], 'https://schema.org');
const graph = schema['@graph'];
const ids = new Set(graph.map(node => node['@id']));
assert.equal(ids.size, graph.length, 'Unique entity IDs');
const person = graph.find(node => node['@type'] === 'Person');
assert.equal(person.name, 'Adnan Abir');
assert.deepEqual(person.alternateName, ['Md Adnan Abir', 'adnanauric']);
assert.equal(person.jobTitle, 'Software QA Working Student');
assert.equal(person.worksFor.name, 'Secusmart');
assert.equal(person.worksFor.parentOrganization.name, 'BlackBerry');
assert.equal(person.affiliation['@type'], 'CollegeOrUniversity');
assert(!person.alumniOf, 'Current student is not marked as a graduate');
assert.deepEqual(person.sameAs, ['https://github.com/adnanauric', 'https://www.linkedin.com/in/md-adnan-abir/']);
assert.equal(graph.find(node => node['@type'] === 'WebSite').publisher['@id'], person['@id']);
assert.equal(graph.find(node => node['@type'] === 'ProfilePage').mainEntity['@id'], person['@id']);
assert.equal(graph.find(node => node['@type'] === 'Blog').creator['@id'], person['@id']);
function checkReferences(value) {
  if (!value || typeof value !== 'object') return;
  if (Object.keys(value).length === 1 && value['@id']) assert(ids.has(value['@id']), `Resolved reference: ${value['@id']}`);
  Object.values(value).forEach(checkReferences);
}
checkReferences(schema);

assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Exactly one primary heading');
assert.match(html, /<h1 id="profile-name">Adnan Abir<\/h1>/);
assert.match(html, /<main>/, 'Main content is in initial HTML');
for (const section of ['top', 'about', 'experience', 'projects', 'education', 'skills', 'contact']) {
  assert(html.includes(`id="${section}"`), `Prerendered section: ${section}`);
}
for (const [, target] of html.matchAll(/href="#([^"]+)"/g)) {
  assert(html.includes(`id="${target}"`), `Anchor exists: ${target}`);
}
assert(!html.includes('<div id="root"></div>'), 'Not an empty client-rendered shell');
assert(!html.includes('AI Enthusiast'), 'No outdated AI positioning in delivered HTML');
const robots = read('dist/robots.txt');
assert.match(robots, /User-agent: \*/);
assert.match(robots, /Allow: \//);
assert(!/Disallow:\s*\S/.test(robots));
assert(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
const sitemap = read('dist/sitemap.xml');
assert(sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url), [canonical]);
for (const url of [meta.ogImage, ...[...html.matchAll(/(?:src|poster)="(\/[^"#]+)"/g)].map(([, path]) => new URL(path, canonical).href)]) {
  assert(existsSync(new URL(`../dist${new URL(url).pathname}`, import.meta.url)), `Asset exists: ${url}`);
}
console.log('SEO validation passed: metadata, entity relationships, static content, headings, links, assets, robots and sitemap.');
