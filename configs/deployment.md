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
2. In the domain provider's DNS settings, a `CNAME` record points to `adnanauric.github.io`.
3. "Enforce HTTPS" is checked in the GitHub Pages settings to ensure a secure connection.
