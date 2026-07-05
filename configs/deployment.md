# Deployment Guide

## Option 1: GitHub Pages (Recommended — Free)

### First-Time Setup
1. Create a new GitHub repository (e.g., `adnan-portfolio`)
2. Push this code to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git remote add origin https://github.com/YOUR_USERNAME/adnan-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings → Pages** in your GitHub repo
4. Set Source to **GitHub Actions**
5. The `.github/workflows/deploy.yml` file handles everything automatically
6. Your site will be live at: `https://YOUR_USERNAME.github.io/adnan-portfolio/`

### Subsequent Updates
Just push to `main` — GitHub Actions auto-deploys:
```bash
git add .
git commit -m "Update content"
git push
```

### Custom Domain (Optional)
1. Buy a domain (e.g., from Namecheap, Cloudflare)
2. Add a CNAME file to `public/` with your domain
3. Configure DNS to point to GitHub Pages
4. Enable HTTPS in GitHub Pages settings

---

## Option 2: Vercel (Alternative — Also Free)

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Vite and deploys
4. Get a free `.vercel.app` subdomain

---

## Option 3: Netlify (Alternative — Also Free)

1. Push repo to GitHub
2. Go to [netlify.com](https://netlify.com) and import the repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Get a free `.netlify.app` subdomain

---

## Pre-Deploy Checklist
- [ ] All placeholder content replaced with real data
- [ ] Profile image added to `public/images/`
- [ ] Social links updated in `content/profile.json`
- [ ] `npm run build` succeeds without errors
- [ ] Preview build locally with `npm run preview`
- [ ] Responsive layout looks good on mobile
