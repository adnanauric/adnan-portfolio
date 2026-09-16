import { readFileSync } from 'node:fs';

const content = (file) => JSON.parse(readFileSync(new URL(`../content/${file}.json`, import.meta.url), 'utf8'));

export function seoTags() {
  const { meta } = content('site-config');
  const profile = content('profile');
  const { education: [degree] } = content('education');
  const person = `${meta.canonical}#person`;
  const website = `${meta.canonical}#website`;
  const page = `${meta.canonical}#webpage`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': person,
        name: profile.fullName, alternateName: profile.alternateName,
        url: meta.canonical, image: meta.ogImage,
        jobTitle: profile.jobTitle, description: profile.seoDescription,
        sameAs: [profile.social.github, profile.social.linkedin],
        workLocation: { '@type': 'Country', name: profile.location },
        worksFor: {
          '@type': 'Organization', name: profile.employer,
          parentOrganization: { '@type': 'Organization', ...profile.employerParent },
        },
        affiliation: {
          '@type': 'CollegeOrUniversity', name: degree.institution,
          alternateName: 'Hochschule Rhein-Waal', url: degree.institutionUrl,
        },
        knowsAbout: profile.knowsAbout,
        mainEntityOfPage: { '@id': page },
      },
      {
        '@type': 'WebSite', '@id': website, url: meta.canonical,
        name: profile.fullName, inLanguage: 'en',
        publisher: { '@id': person }, about: { '@id': person },
      },
      {
        '@type': 'ProfilePage', '@id': page, url: meta.canonical,
        name: meta.title, description: meta.description, inLanguage: 'en',
        isPartOf: { '@id': website }, mainEntity: { '@id': person },
        relatedLink: profile.travelBlog,
      },
      {
        '@type': 'Blog', '@id': `${profile.travelBlog}#blog`,
        url: profile.travelBlog, name: 'The Broken Backpack',
        description: 'The travel blog of Adnan Abir.',
        creator: { '@id': person }, publisher: { '@id': person },
      },
    ],
  };
  const named = (name, value) => ({ tag: 'meta', attrs: { name, content: value } });
  const og = (property, value) => ({ tag: 'meta', attrs: { property, content: String(value) } });
  return [
    { tag: 'title', children: meta.title.replaceAll('&', '&amp;') },
    named('description', meta.description), named('author', profile.fullName),
    named('robots', 'index, follow, max-image-preview:large'),
    { tag: 'link', attrs: { rel: 'canonical', href: meta.canonical } },
    og('og:title', meta.title), og('og:description', meta.description),
    og('og:url', meta.canonical), og('og:type', 'website'),
    og('og:site_name', profile.fullName), og('og:locale', 'en_US'),
    og('og:image', meta.ogImage), og('og:image:type', 'image/jpeg'),
    og('og:image:width', meta.ogImageWidth), og('og:image:height', meta.ogImageHeight),
    og('og:image:alt', meta.ogImageAlt),
    // The existing professional photo is a portrait, not a landscape banner.
    named('twitter:card', 'summary'), named('twitter:title', meta.title),
    named('twitter:description', meta.description),
    named('twitter:image', meta.ogImage), named('twitter:image:alt', meta.ogImageAlt),
    { tag: 'script', attrs: { type: 'application/ld+json' },
      children: JSON.stringify(graph).replaceAll('<', '\\u003c') },
  ].map(tag => ({ ...tag, injectTo: 'head' }));
}
