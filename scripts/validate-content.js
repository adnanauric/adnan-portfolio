/**
 * validate-content.js
 * Validates all content JSON files have required fields.
 * Run: node scripts/validate-content.js
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = resolve(__dirname, '..', 'content');

let errors = 0;

function check(condition, message) {
  if (!condition) {
    console.error(`❌ ${message}`);
    errors++;
  } else {
    console.log(`✅ ${message}`);
  }
}

function loadJSON(filename) {
  try {
    const raw = readFileSync(resolve(contentDir, filename), 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error(`❌ Failed to load ${filename}: ${e.message}`);
    errors++;
    return null;
  }
}

console.log('\\n🔍 Validating content files...\\n');

// --- profile.json ---
const profile = loadJSON('profile.json');
if (profile) {
  check(profile.name, 'profile.json: has "name"');
  check(profile.tagline, 'profile.json: has "tagline"');
  check(Array.isArray(profile.bio) && profile.bio.length > 0, 'profile.json: has "bio" array with content');
  check(profile.email, 'profile.json: has "email"');
  check(profile.social && profile.social.github, 'profile.json: has GitHub social link');
}

// --- experience.json ---
const experience = loadJSON('experience.json');
if (experience) {
  check(Array.isArray(experience) && experience.length > 0, 'experience.json: is non-empty array');
  if (experience.length > 0) {
    const job = experience[0];
    check(job.company, 'experience.json: first entry has "company"');
    check(job.title, 'experience.json: first entry has "title"');
    check(job.startDate, 'experience.json: first entry has "startDate"');
    check(Array.isArray(job.description), 'experience.json: first entry has "description" array');
  }
}

// --- projects.json ---
const projects = loadJSON('projects.json');
if (projects) {
  check(Array.isArray(projects.featured), 'projects.json: has "featured" array');
  check(Array.isArray(projects.other), 'projects.json: has "other" array');
  if (projects.featured.length > 0) {
    const p = projects.featured[0];
    check(p.title, 'projects.json: first featured project has "title"');
    check(p.description, 'projects.json: first featured project has "description"');
    check(Array.isArray(p.tech), 'projects.json: first featured project has "tech" array');
  }
}

// --- skills.json ---
const skills = loadJSON('skills.json');
if (skills) {
  check(Array.isArray(skills.categories) && skills.categories.length > 0, 'skills.json: has "categories" array');
  if (skills.categories.length > 0) {
    const cat = skills.categories[0];
    check(cat.name, 'skills.json: first category has "name"');
    check(Array.isArray(cat.skills), 'skills.json: first category has "skills" array');
  }
}

// --- site-config.json ---
const config = loadJSON('site-config.json');
if (config) {
  check(config.meta && config.meta.title, 'site-config.json: has meta title');
  check(config.design && config.design.accentColor, 'site-config.json: has accent color');
  check(config.sections, 'site-config.json: has sections config');
}

// --- Summary ---
console.log('\\n' + '='.repeat(40));
if (errors === 0) {
  console.log('✅ All content files are valid!\\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${errors} error(s). Fix them before deploying.\\n`);
  process.exit(1);
}
