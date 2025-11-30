#!/usr/bin/env node

/**
 * Production build script for portfolio website
 * Handles SCSS compilation issues and optimizes for deployment
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting production build...');

// Step 1: Clean previous build
console.log('🧹 Cleaning previous build...');
try {
  execSync('rm -rf dist', { stdio: 'inherit' });
} catch (error) {
  // Directory might not exist, continue
}

// Step 2: Create a temporary build configuration that skips problematic SCSS
console.log('⚙️ Configuring build settings...');

const originalViteConfig = readFileSync('vite.config.js', 'utf8');

// Create a production-optimized vite config
const productionConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Ignore SCSS errors for production build
        silenceDeprecations: ['legacy-js-api'],
        quietDeps: true
      }
    }
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    },
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})`;

// Backup original config and write production config
writeFileSync('vite.config.js.backup', originalViteConfig);
writeFileSync('vite.config.js', productionConfig);

try {
  // Step 3: Run the build
  console.log('🔨 Building application...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      VITE_BUILD_MODE: 'production'
    }
  });

  console.log('✅ Build completed successfully!');
  
  // Step 4: Optimize build output
  console.log('🎯 Optimizing build output...');
  
  if (existsSync('dist')) {
    // Add additional optimizations here if needed
    console.log('📦 Build artifacts created in dist/ directory');
    
    // Display build size information
    try {
      const stats = execSync('du -sh dist', { encoding: 'utf8' });
      console.log('📊 Build size:', stats.trim());
    } catch (error) {
      // du command might not be available on all systems
      console.log('📊 Build completed - check dist/ directory for output');
    }
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Step 5: Restore original config
  console.log('🔄 Restoring original configuration...');
  if (existsSync('vite.config.js.backup')) {
    writeFileSync('vite.config.js', originalViteConfig);
    execSync('rm vite.config.js.backup');
  }
}

console.log('🎉 Production build process completed!');
console.log('');
console.log('Next steps:');
console.log('1. Test the build locally: npm run preview');
console.log('2. Deploy to Vercel: vercel --prod');
console.log('3. Or deploy to your preferred hosting platform');