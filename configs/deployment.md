# Deployment Guide

This portfolio website is successfully deployed and hosted via **GitHub Pages** with the custom domain **adnanabir.com**.

## Current Setup
- **Repository:** Hosted on GitHub (`https://github.com/adnanauric/adnan-portfolio`)
- **Live URL:** `https://adnanabir.com`
- **Automation:** Any updates pushed to the `main` branch are automatically built and deployed to the live website using GitHub Actions.

## How to Update the Website

Whenever you want to update content or make code changes, follow these simple steps to deploy them:

1. **Make your changes locally** (e.g., updating JSON files in `content/` or changing code).
2. **Commit and Push** your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Describe your updates here"
   git push
   ```
3. **Wait a few minutes.** GitHub Actions will automatically detect the push, run the build process (`npm run build`), and publish the latest version of your site to `adnanabir.com`.

You can monitor the deployment progress in the **Actions** tab of your GitHub repository.

## Custom Domain Reference
For future reference, here is how the custom domain (`adnanabir.com`) is configured:
1. In the GitHub repository **Settings → Pages**, "Custom domain" is set to `adnanabir.com`.
2. Keep the existing working apex-domain DNS records. A `www` CNAME can point to `adnanauric.github.io`; apex domains use GitHub's documented A/AAAA or supported ALIAS/ANAME configuration. Do not replace functioning DNS based on the `www` example.
3. "Enforce HTTPS" is checked in the GitHub Pages settings to ensure a secure connection.

## SEO deployment checks

The build now includes static homepage HTML, robots.txt, sitemap.xml and generated identity metadata. Existing GitHub Actions already runs `npm run build`, including the SEO validator; no new hosting service is required.

Public checks on 17 September 2026 confirmed permanent redirects from HTTP, www and `adnanauric.github.io/adnan-portfolio/` to `https://adnanabir.com/`. The alternate `/index.html` URL returns 200 on GitHub Pages; the generated canonical tag consolidates it with `/`. GitHub Pages does not support arbitrary per-path HTTP redirect rules. No JavaScript redirect, meta refresh or unsupported `_redirects` file has been added.

After publishing, verify that `/robots.txt` and `/sitemap.xml` return 200, the homepage source contains the full portfolio and JSON-LD, and `/index.html` declares the same canonical. Submit the sitemap and request homepage indexing in Google Search Console. Detailed evidence and follow-up steps: [SEO audit](seo-audit.md).

References: [GitHub custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
