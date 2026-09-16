# Adnan Abir 🚀

[![Live Site](https://img.shields.io/badge/Website-adnanabir.com-64ffda?style=for-the-badge&logoColor=black)](https://adnanabir.com)

Personal portfolio of **Adnan Abir — Software QA, Automation & Applied AI** at [adnanabir.com](https://adnanabir.com/). GitHub username: **adnanauric**. The alternate name **Md Adnan Abir** is associated with the same person through structured data.

I test, build, explore—and occasionally get lost on purpose. I’m a **Software QA Working Student at Secusmart, a BlackBerry subsidiary**, and an **Infotronic Systems Engineering student** at Hochschule Rhein-Waal in Germany. My current work includes manual and functional testing, release validation, test execution, documentation and test management. Automation and backend/API testing are areas I am developing toward, not my current formal job title.

---

## 👨‍💻 About Me

In my professional role, I contribute to software quality by testing features, identifying issues, working with test cases, and supporting reliable development processes. This experience has strengthened my attention to detail and taught me that great software is not only about how it works—but also how consistently and securely it performs.

Beyond QA, I practice applied AI through LLMs, local/private workflows and AI-assisted engineering. I am developing my Python automation and API testing skills while building practical projects.

Outside technology, I am a traveler and run [The Broken Backpack](https://www.thebrokenbackpack.com/), my travel blog.

## 🛠️ What I Built Here

This repository contains the source code for [adnanabir.com](https://adnanabir.com). I designed and engineered it from scratch to be a reflection of my approach to clean architecture and modern design:

- **Data-Driven:** The site uses a content-data separation architecture. All content lives in a centralized JSON layer, making it infinitely scalable and easy to manage without touching React components.
- **Bespoke Design:** Built with a custom vanilla CSS design system—no heavy UI frameworks—featuring glassmorphism, dynamic gradients, and smooth scroll animations.
- **Tech Stack:** React 19, Vite, and native CSS. The production build renders the same React page to static HTML, then hydrates it for interactive navigation and contact handling.

## Development and SEO

```sh
npm ci
npm run dev
npm run build
npm run preview
npm run lint
```

`npm run build` generates the client assets, prerenders the homepage and validates the delivered SEO markup. `npm run check:seo` validates an existing build. No server runtime is needed on GitHub Pages.

Metadata is maintained in `content/site-config.json`; identity and public profiles are in `content/profile.json`. `scripts/seo.js` generates one consistent title, canonical, social metadata and JSON-LD graph. `public/robots.txt` and `public/sitemap.xml` are copied into the deployment. The sitemap contains only the canonical homepage, not section fragments.

See [the SEO audit and handoff](configs/seo-audit.md) for validation, hosting limits, Search Console steps and optional content improvements. See [deployment instructions](configs/deployment.md) for publishing.

## 📫 Let's Connect

I'm always open to discussing new opportunities, exploring AI-assisted workflows, software quality assurance, or just talking about tech.

- **Website:** [adnanabir.com](https://adnanabir.com)
- **GitHub:** [@adnanauric](https://github.com/adnanauric)
- **LinkedIn:** [Adnan Abir](https://www.linkedin.com/in/md-adnan-abir/)

Feel free to check out my projects on my live site, or reach out to me directly!
