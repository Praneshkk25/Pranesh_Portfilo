// Fast development script for quicker startup
const { spawn } = require('child_process');

console.log('🚀 Starting fast development server...');

// Clear cache and start dev server with optimizations
const vite = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    VITE_FAST_REFRESH: 'true',
    VITE_OPTIMIZE_DEPS: 'true'
  }
});

vite.on('close', (code) => {
  console.log(`Development server exited with code ${code}`);
});

vite.on('error', (err) => {
  console.error('Failed to start development server:', err);
});