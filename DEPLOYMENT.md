# 🚀 Deployment Guide - Aircraft Maintenance Predictive Hub

## GitHub Pages Deployment

This guide explains how to deploy the Aircraft Maintenance Predictive Hub to GitHub Pages.

---

## 📋 Prerequisites

- GitHub account with repository access
- Git installed locally
- Node.js 18+ and pnpm installed
- Repository: `stevedicko99-pixel/Aircraft-PMP`

---

## 🔧 Setup Instructions

### Step 1: Configure GitHub Pages

1. Go to your repository settings
2. Navigate to **Settings > Pages**
3. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main` (or your default branch)
   - **Folder**: Select `/ (root)`
4. Click **Save**

### Step 2: Configure Vite for GitHub Pages

The project is pre-configured for deployment. Ensure `vite.config.ts` includes:

```typescript
export default defineConfig({
  base: '/Aircraft-PMP/',
  // ... other config
})
```

### Step 3: Build and Deploy

```bash
# 1. Navigate to project directory
cd aeronautics-predictive-maintenance

# 2. Install dependencies
pnpm install

# 3. Build for production
pnpm build

# 4. Copy built files to docs folder (if using docs folder)
# OR commit dist folder to repository

# 5. Commit and push to GitHub
git add .
git commit -m "Deploy: Aircraft Maintenance Predictive Hub v1.0"
git push origin main
```

---

## 📦 Deployment Options

### Option 1: Deploy from dist folder (Recommended)

```bash
# Build the project
pnpm build

# The dist folder contains the built application
# Commit and push to GitHub
git add dist/
git commit -m "Deploy: Build files"
git push origin main
```

Then in GitHub Pages settings:
- Select branch: `main`
- Select folder: `/dist`

### Option 2: Deploy from docs folder

```bash
# Build the project
pnpm build

# Copy dist to docs folder
mkdir -p docs
cp -r dist/* docs/

# Commit and push
git add docs/
git commit -m "Deploy: Update docs folder"
git push origin main
```

Then in GitHub Pages settings:
- Select branch: `main`
- Select folder: `/docs`

### Option 3: Use GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Install dependencies
        run: pnpm install
        working-directory: ./aeronautics-predictive-maintenance
      
      - name: Build
        run: pnpm build
        working-directory: ./aeronautics-predictive-maintenance
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./aeronautics-predictive-maintenance/dist
```

---

## 🌐 Access Your Deployed Site

After deployment, your site will be available at:

```
https://stevedicko99-pixel.github.io/Aircraft-PMP/
```

---

## ✅ Verification Checklist

- [ ] Repository is public
- [ ] GitHub Pages is enabled in settings
- [ ] Build folder is correctly configured
- [ ] Site is accessible at the GitHub Pages URL
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works as expected
- [ ] Mobile responsiveness verified
- [ ] Language switching works
- [ ] No console errors

---

## 🔍 Troubleshooting

### Site not loading

1. Check GitHub Pages settings
2. Verify branch and folder are correct
3. Check for build errors: `pnpm build`
4. Clear browser cache

### Images not displaying

1. Verify image paths in code
2. Check that images are in `client/public/images/`
3. Ensure base path is correct in `vite.config.ts`

### Styles not applying

1. Check CSS build output
2. Verify Tailwind configuration
3. Clear browser cache
4. Check for CSS import errors

### Navigation not working

1. Verify routes in `App.tsx`
2. Check Wouter configuration
3. Ensure base path matches Vite config

---

## 📊 Performance Optimization

### Before Deployment

1. **Minify assets**
   ```bash
   pnpm build
   ```

2. **Check bundle size**
   ```bash
   pnpm build
   # Review output in terminal
   ```

3. **Optimize images**
   - Images should be < 500KB each
   - Use modern formats (WebP, AVIF)
   - Compress with tools like TinyPNG

4. **Enable compression**
   - GitHub Pages automatically gzips files
   - No additional configuration needed

### Lighthouse Audit

After deployment, run Lighthouse audit:

1. Open site in Chrome
2. Press F12 to open DevTools
3. Go to Lighthouse tab
4. Click "Analyze page load"
5. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 100

---

## 🔄 Continuous Deployment

### Automatic Updates

Every push to `main` branch will:
1. Trigger GitHub Actions (if configured)
2. Build the project
3. Deploy to GitHub Pages
4. Site updates automatically

### Manual Updates

To manually update:

```bash
# Make changes
git add .
git commit -m "Update: Description of changes"
git push origin main
```

---

## 📝 Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings > Pages**
2. Under "Custom domain", enter your domain
3. Add DNS records to your domain provider
4. Verify domain ownership

---

## 🔐 Security

### Best Practices

- Keep dependencies updated: `pnpm update`
- Review security advisories: `pnpm audit`
- Use HTTPS (automatic with GitHub Pages)
- Regularly backup repository
- Monitor for suspicious activity

### Secrets Management

Never commit sensitive information:
- API keys
- Tokens
- Passwords
- Private data

Use environment variables instead.

---

## 📞 Support

If you encounter issues:

1. Check [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html)
3. Open an issue on GitHub
4. Check existing issues for solutions

---

## 🎉 Success!

Your Aircraft Maintenance Predictive Hub is now live on GitHub Pages!

Share the link:
```
https://stevedicko99-pixel.github.io/Aircraft-PMP/
```

---

*Last Updated: January 13, 2025*
