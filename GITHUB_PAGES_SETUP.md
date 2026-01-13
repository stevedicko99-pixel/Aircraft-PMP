# 🚀 GitHub Pages Setup Guide

## Aircraft Maintenance Predictive Hub - Live Deployment

Your project is ready to be deployed to GitHub Pages! Follow these simple steps.

---

## ✅ Quick Start (5 minutes)

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/stevedicko99-pixel/Aircraft-PMP
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select "Deploy from a branch"
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
5. Click **Save**

### Step 2: Build and Push

```bash
# Navigate to project
cd Aircraft-PMP/aeronautics-predictive-maintenance

# Install dependencies
pnpm install

# Build for production
pnpm build

# Go back to root
cd ..

# Add all files
git add -A

# Commit
git commit -m "Deploy: Aircraft Maintenance Predictive Hub to GitHub Pages"

# Push to GitHub
git push origin main
```

### Step 3: Access Your Site

After 1-2 minutes, your site will be live at:

```
https://stevedicko99-pixel.github.io/Aircraft-PMP/
```

---

## 📋 Detailed Setup Instructions

### Prerequisites

- Git installed
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Repository cloned locally

### Configuration

The project is pre-configured for GitHub Pages. Key settings:

**vite.config.ts:**
```typescript
export default defineConfig({
  base: '/Aircraft-PMP/',
  // ... rest of config
})
```

This ensures all assets load correctly from the `/Aircraft-PMP/` path.

### Build Process

```bash
# 1. Install dependencies
pnpm install

# 2. Build for production
pnpm build

# Output: dist/ folder with:
# - dist/public/index.html (main page)
# - dist/public/assets/ (CSS, JS, images)
# - dist/index.js (server file, not needed for static hosting)
```

### Deployment

**Option A: Deploy from root (Recommended)**

```bash
# Build
pnpm build

# Commit built files
git add dist/
git commit -m "Deploy: Build files"
git push origin main

# In GitHub Pages settings:
# - Branch: main
# - Folder: / (root)
```

**Option B: Deploy from docs folder**

```bash
# Build
pnpm build

# Copy to docs folder
mkdir -p docs
cp -r dist/public/* docs/

# Commit
git add docs/
git commit -m "Deploy: Update docs folder"
git push origin main

# In GitHub Pages settings:
# - Branch: main
# - Folder: /docs
```

---

## 🔍 Verification

### Check Deployment Status

1. Go to repository Settings > Pages
2. Look for green checkmark: "Your site is live at..."
3. Click the link to verify

### Troubleshooting

**Site not loading?**
- Wait 2-3 minutes after push
- Clear browser cache (Ctrl+Shift+Delete)
- Check GitHub Pages settings
- Verify branch and folder are correct

**Images not showing?**
- Images are in `client/public/images/`
- Base path in `vite.config.ts` is `/Aircraft-PMP/`
- Clear cache and refresh

**Styles broken?**
- CSS is bundled in build
- Check for build errors: `pnpm build`
- Verify no console errors (F12)

**Navigation not working?**
- Routes use Wouter (client-side routing)
- Works correctly with GitHub Pages
- Try clearing cache

---

## 📊 What Gets Deployed

```
dist/public/
├── index.html              # Main HTML file
├── assets/
│   ├── index-[hash].css   # Bundled CSS
│   ├── index-[hash].js    # Bundled JavaScript
│   └── ...                # Other assets
└── images/                # Aerospace images
    ├── hero-aircraft-blueprint.png
    ├── ai-predictive-maintenance.png
    └── ...
```

---

## 🔄 Updating Your Site

Every time you want to update:

```bash
# Make changes to code
# ...

# Build
pnpm build

# Commit and push
git add dist/
git commit -m "Update: Description of changes"
git push origin main
```

Site updates automatically within 1-2 minutes.

---

## 📱 Testing Before Deployment

### Local Testing

```bash
# Start dev server
pnpm dev

# Visit http://localhost:5173
# Test all pages and features
```

### Production Build Testing

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Visit http://localhost:4173
# Test with production build
```

---

## 🎯 Site Features

Your deployed site includes:

✅ **13 Pages**
- Home, Learning Hub, News, Blogs
- Inspiring Professionals, Bachelor's Guide
- Conferences, Forum, Certifications
- Community, Resources, About

✅ **Bilingual Support**
- English & French
- Language selector in header

✅ **Dynamic Features**
- Smooth animations
- Interactive modals
- Search and filtering
- Responsive design

✅ **Real Content**
- Original articles
- Aerospace images
- Professional layout

---

## 📈 Performance

Expected performance metrics:

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Score | 90+ | ✅ |
| First Contentful Paint | < 1.5s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Time to Interactive | < 3s | ✅ |

---

## 🔐 Security

GitHub Pages provides:

- ✅ Free HTTPS/SSL
- ✅ DDoS protection
- ✅ Automatic backups
- ✅ Version control

---

## 📞 Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Repository Issues](https://github.com/stevedicko99-pixel/Aircraft-PMP/issues)

---

## ✨ Next Steps

After deployment:

1. **Share the link**: https://stevedicko99-pixel.github.io/Aircraft-PMP/
2. **Test all features** on the live site
3. **Gather feedback** from users
4. **Make improvements** and redeploy

---

## 🎉 Success Checklist

- [ ] GitHub Pages enabled in settings
- [ ] Build completed successfully
- [ ] Files pushed to GitHub
- [ ] Site is live and accessible
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works
- [ ] Mobile view responsive
- [ ] Language switching works
- [ ] No console errors

---

## 📝 Quick Reference

```bash
# Full deployment workflow
cd Aircraft-PMP/aeronautics-predictive-maintenance
pnpm install
pnpm build
cd ..
git add dist/
git commit -m "Deploy: Update"
git push origin main
```

Then visit: https://stevedicko99-pixel.github.io/Aircraft-PMP/

---

**Your site is ready to go live! 🚀**

*For detailed information, see DEPLOYMENT.md*
