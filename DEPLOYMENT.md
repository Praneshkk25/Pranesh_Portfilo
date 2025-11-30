# Deployment Guide

This document provides instructions for deploying the Pranesh K K Portfolio website to various platforms.

## Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build:prod
```

### Local Preview
```bash
npm run preview
```

## Deployment Platforms

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Production**
   ```bash
   npm run deploy
   ```
   
   Or manually:
   ```bash
   npm run build:prod
   vercel --prod
   ```

3. **Configuration**
   - The `vercel.json` file is already configured
   - Automatic deployments from Git are supported
   - Custom domain configuration available in Vercel dashboard

### Netlify

1. **Build Command**: `npm run build:prod`
2. **Publish Directory**: `dist`
3. **Environment Variables**: None required for basic deployment

### GitHub Pages

1. **Build and Deploy**
   ```bash
   npm run build:prod
   # Copy dist/ contents to gh-pages branch
   ```

2. **GitHub Actions** (Optional)
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build:prod
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

### Other Platforms

For other hosting platforms (AWS S3, Firebase Hosting, etc.):
1. Run `npm run build:prod`
2. Upload the `dist/` directory contents
3. Configure the platform for SPA routing (redirect all routes to `index.html`)

## Performance Optimizations

The production build includes:

- **Code Splitting**: Vendor libraries and components are split into separate chunks
- **Minification**: JavaScript and CSS are minified using Terser
- **Asset Optimization**: Images and fonts are optimized for web delivery
- **Caching**: Static assets have long-term caching headers
- **Compression**: Gzip/Brotli compression is enabled

## SEO Configuration

The website includes:

- **Meta Tags**: Comprehensive SEO meta tags
- **Open Graph**: Social media sharing optimization
- **Structured Data**: JSON-LD schema for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## Environment Variables

No environment variables are required for basic deployment. Optional variables:

- `VITE_ANALYTICS_ID`: Google Analytics tracking ID
- `VITE_CONTACT_FORM_ENDPOINT`: Contact form submission endpoint

## Domain Configuration

### Custom Domain Setup

1. **DNS Configuration**
   ```
   Type: CNAME
   Name: www
   Value: your-vercel-deployment.vercel.app
   
   Type: A
   Name: @
   Value: 76.76.19.61 (Vercel IP)
   ```

2. **SSL Certificate**
   - Automatic SSL certificates are provided by most platforms
   - Let's Encrypt certificates are automatically renewed

## Monitoring and Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Error tracking and reporting

### Analytics Integration
- Google Analytics 4 ready
- Privacy-compliant tracking
- GDPR compliance features

## Troubleshooting

### Common Issues

1. **SCSS Compilation Errors**
   - Use `npm run build:prod` instead of `npm run build`
   - The production script handles SCSS compatibility issues

2. **Routing Issues**
   - Ensure SPA routing is configured on your hosting platform
   - All routes should redirect to `index.html`

3. **Asset Loading Issues**
   - Check that the base URL is correctly configured
   - Verify that static assets are being served with correct MIME types

### Build Optimization

If build size is too large:
1. Analyze bundle size: `npm run build:prod && npx vite-bundle-analyzer dist`
2. Enable tree shaking for unused code
3. Optimize images and fonts
4. Consider lazy loading for non-critical components

## Security Considerations

- **Content Security Policy**: Configured for XSS protection
- **HTTPS Only**: All deployments should use HTTPS
- **Dependency Security**: Regular security audits with `npm audit`
- **Environment Variables**: Sensitive data should never be in client-side code

## Maintenance

### Regular Updates
- Update dependencies monthly: `npm update`
- Security patches: `npm audit fix`
- Performance monitoring: Check Core Web Vitals monthly

### Backup Strategy
- Source code: Git repository with multiple remotes
- Build artifacts: Automated backups on hosting platform
- Configuration: Document all custom configurations

## Support

For deployment issues:
1. Check the build logs for specific error messages
2. Verify all dependencies are correctly installed
3. Test the build locally with `npm run preview`
4. Contact the hosting platform support if needed

---

**Last Updated**: December 2024
**Version**: 1.0.0