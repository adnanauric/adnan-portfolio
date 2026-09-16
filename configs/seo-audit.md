# SEO audit and handoff — 17 September 2026

Website: https://adnanabir.com/  
Public identity: **Adnan Abir — Software QA | Automation & Applied AI | Traveler**  
Alternate names: **Md Adnan Abir**, **adnanauric**

## Changes and their purpose

- Replaced the old generic title with **Adnan Abir | Software QA, Automation & Applied AI**. The owner-approved description is: “Adnan Abir is a Software QA professional in Germany focused on software testing, quality engineering, automation, backend/API testing, Python and practical applied AI.” Author metadata uses the full public name. The Person description retains the distinction between current QA work and developing automation skills.
- Added a single canonical homepage, consistent Open Graph metadata, Twitter/X metadata, and index/follow directives. Metadata is generated from the content files in development and production so it does not drift between templates.
- Added one JSON-LD graph containing Person, WebSite, ProfilePage and Blog. Stable entity IDs connect the portfolio and The Broken Backpack to the same person. The full/legal name is an alternateName, not repeated visible text.
- Job title remains **Software QA Working Student**. Secusmart is the employer and BlackBerry its parent organization, as confirmed by the owner. Current enrollment uses university affiliation, not an alumni/graduation claim. The existing university URL and actual GitHub/LinkedIn URLs are retained. No employer URL, credential, seniority or AI job title was invented.
- Kept knowsAbout concise: QA, manual/functional testing, release validation/test management, automation, backend/API testing, Python, applied AI, LLMs, AI-assisted engineering/QA and privacy-aware local AI. No claim of professional automation seniority is made.
- Added public robots.txt and a sitemap with **only** the canonical homepage. Fragment links remain useful section navigation, not separate indexable pages.
- Added build-time rendering of the existing React App. The initial production HTML now contains the real portfolio instead of an empty root. React hydrates that same markup for interactions. A no-JavaScript fallback reveals the existing content, with no alternate SEO-only copy.
- Changed the existing visible name to the single h1, and the existing role/study heading to h2. CSS selector changes preserve their original computed styles exactly. No hidden headings or keyword text were added.
- Improved project-image alt text and source-link accessible names; identified the travel link as Adnan Abir’s blog; marked the decorative hero video and honeypot appropriately. Preserved image files, lazy loading and the portrait’s existing dimensions. Added monogram dimensions and a high-priority preload for the existing hero poster.
- Updated repository author/identity documentation and added production SEO validation to the existing build/deploy command. Removed the stale content-validator requirement for a public email address.

The existing portrait is used for Open Graph and a Twitter **summary** card. It is a professional portrait, not a landscape banner; no new crop, generated artwork, X username or visual asset was introduced.

## Maintenance notes

Keep the public README focused on Adnan’s portfolio, background, projects and contact links. SEO implementation, alternate-name strategy, role-positioning decisions and audit details belong in this document.

The public name is Adnan Abir, the alternate/legal name is Md Adnan Abir and the GitHub username is adnanauric. Structured data connects these identities. The current formal role is Software QA Working Student; automation and backend/API testing describe developing areas, not a separate current job title.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm run lint
```

`npm run build` generates the client assets, prerenders the homepage and validates the delivered SEO markup. `npm run check:seo` validates an existing build. The same React page is rendered to static HTML and then hydrated for navigation and contact interactions; no server runtime is needed on GitHub Pages.

Metadata is maintained in `content/site-config.json`; identity and public profiles are in `content/profile.json`. `scripts/seo.js` generates the title, canonical, social metadata and JSON-LD graph from those files. The description is shared by the standard meta description, Open Graph, Twitter/X and ProfilePage structured data. `public/robots.txt` and `public/sitemap.xml` are copied into the deployment; the sitemap contains only the canonical homepage, not section fragments.

See [deployment instructions](deployment.md) for publishing. This document is tracked in the repository; moving notes out of the README does not make them private.

## Validation

- Production build, SEO assertions, content validation, lint and whitespace checks pass.
- Both the initial generated HTML and the hydrated browser DOM contain one h1, one title, one description, one canonical and one JSON-LD graph. The graph parses successfully and its entity references resolve. Graph types/properties were checked against Schema.org documentation. This is not a claim of Google rich-result approval; run its public test after deployment.
- Initial HTML includes all seven sections and the existing portfolio text without running JavaScript. Local production robots.txt and sitemap.xml return HTTP 200 with text/plain and text/xml content types.
- No noindex, blocking robots rules, duplicate metadata or broken internal section anchors were found. The public page is the homepage; projects link to external repositories, not local project routes.
- Before/after browser checks at **1440 × 900** and **440 × 956** matched the visible text and all **315 existing HTML elements’** measured widths, heights, offsets, fonts, margins, padding and display values. Production-only image preload link nodes were excluded from layout comparisons because they have no visual box. No horizontal overflow occurred.
- Production menu opening and Contact navigation work after hydration. No test email was sent. No hydration warnings/errors were observed.
- Original image/video files, effects, animations, colors, breakpoints, section order and visible wording are preserved. New project-image dimensions were evaluated but omitted because they changed the pre-load mobile card height; the existing crop/layout takes priority.

## Live URL audit (before deploying this change)

| URL | Observed result |
| --- | --- |
| https://adnanabir.com/ | 200; GitHub Pages |
| http://adnanabir.com/ | 301 → canonical HTTPS homepage |
| https://www.adnanabir.com/ | 301 → canonical non-www homepage |
| http://www.adnanabir.com/ | 301 → canonical HTTPS homepage |
| https://adnanauric.github.io/adnan-portfolio/ | 301 → canonical homepage |
| https://adnanabir.com/index.html | 200 duplicate; now receives the same canonical after deployment |
| /robots.txt and /sitemap.xml | Previously 404; provided in the new build |
| Existing portrait URL | 200 |
| GitHub profile | 200 |
| The Broken Backpack | 200 |
| Existing LinkedIn URL | Automated request received 999; URL retained from the owner's existing profile data, not independently verified by scraping |

No redirect loop or X-Robots-Tag blocking was observed. GitHub Pages cannot add arbitrary per-path server redirects from repository files. Canonical metadata handles /index.html without a JavaScript redirect. HTTPS/www redirects already work, so no DNS or account-setting change is needed based on this audit.

## Performance findings and limits

- Initial content is now server-generated at build time, avoiding a JavaScript-only blank page. The existing hero poster is preloaded; below-the-fold pictures remain lazy-loaded.
- Final generated HTML is approximately 25 KB; client JS approximately 218 KB (69 KB gzip), CSS approximately 30 KB (7.2 KB gzip). No new client dependency, external font or tracking script was added.
- Existing project PNGs are approximately 2.2 MB and 0.8 MB. Their files were deliberately preserved. A future lossless optimization or carefully compared responsive-image workflow is the main remaining asset opportunity.
- The live host reported Cache-Control: max-age=600. JavaScript and CSS have content-hashed filenames. Custom response caching headers are controlled by GitHub Pages, not by a repository `_headers` file.
- The public Google PageSpeed API returned **HTTP 429 RESOURCE_EXHAUSTED**. No Lighthouse score or field LCP/INP/CLS result is claimed. Local geometry checks do not establish real-user Core Web Vitals. Check PageSpeed Insights and Search Console after deployment.

## Manual actions

1. Review and publish through the existing GitHub Pages workflow. These changes have not been pushed or deployed by this task.
2. Verify the **adnanabir.com** Domain property in [Google Search Console](https://search.google.com/search-console/) if not already verified. Use Google's supplied DNS TXT value; no verification token was invented.
3. Submit **https://adnanabir.com/sitemap.xml**, then inspect **https://adnanabir.com/** and request indexing. Confirm Google's selected canonical after recrawling.
4. Test the deployed page with [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/). Confirm social previews after caches refresh.
5. Check [PageSpeed Insights](https://pagespeed.web.dev/) and Search Console's Core Web Vitals report. Measure mobile and desktop; real-user data may be unavailable for a low-traffic site.
6. Keep the public name, portfolio URL, employer relationship and professional positioning consistent on GitHub, LinkedIn and The Broken Backpack. Add a natural author/about backlink from the travel blog if it does not already exist. Review the retained LinkedIn URL while signed in.

These improvements clarify identity and make the page easier to crawl. They do not guarantee indexing, ranking positions, rich results or a knowledge panel, and Google may choose its own title/snippet.

## Optional visible content changes — not implemented

- Naturally mention **Secusmart, a BlackBerry subsidiary** once in About or Experience.
- Refine the About paragraph to name **Applied AI** and distinguish practical AI use from developing automation/API skills.
- Add one short, natural reference to **The Broken Backpack** in the existing travel paragraph.
- If desired, clarify the existing visible “Software QA Engineer” hero wording to match the exact working-student role. Structured data already uses the precise title requested.

## Files changed

- `README.md` — public portfolio introduction, background and contact links.
- `configs/deployment.md` — redirect/canonical behavior and deployment checks.
- `configs/seo-audit.md` — this audit, evidence, limitations and handoff.
- `content/profile.json` — accurate machine-readable identity and relationships.
- `content/projects.json` — descriptive image alt text.
- `content/site-config.json` — metadata source of truth.
- `index.html` — metadata insertion point, poster preload, no-JavaScript fallback.
- `package.json` — author/project metadata and build/validation commands.
- `public/robots.txt` — public crawl permission and sitemap reference.
- `public/sitemap.xml` — single canonical page.
- `scripts/seo.js` — head metadata and entity graph generation.
- `scripts/prerender.js` — static rendering of the same React App.
- `scripts/validate-seo.js` — production HTML and crawler-file assertions.
- `scripts/validate-content.js` — public-name check instead of removed email.
- `src/App.jsx` — semantic headings, alt/accessibility attributes and home URL.
- `src/App.css` — equivalent selectors for semantic heading tags only.
- `src/main.jsx` — hydrate production HTML; keep client rendering for development.
- `src/entry-server.jsx` — shared App rendering entry point.
- `vite.config.js` — metadata injection and root-relative production assets.

## References

- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: profile-page structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Schema.org: Person](https://schema.org/Person) and [affiliation](https://schema.org/affiliation)
- [Vite: server-side rendering and prerendering](https://vite.dev/guide/ssr.html)
- [GitHub: custom domains and redirects](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
