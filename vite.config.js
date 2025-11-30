import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Faster development server
    hmr: {
      overlay: false
    },
    // Enable faster file watching
    watch: {
      usePolling: false,
      interval: 100
    }
  },
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
    include: ['react', 'react-dom', 'framer-motion'],
    // Force pre-bundling of these dependencies
    force: true
  },
  // Enable faster builds
  esbuild: {
    target: 'es2020'
  }
})