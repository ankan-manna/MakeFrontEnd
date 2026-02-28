import { execSync } from 'child_process';

console.log('Installing dependencies in mediconnect-frontend...');
execSync('cd /vercel/share/v0-project/mediconnect-frontend && npm install', { stdio: 'inherit' });
console.log('Dependencies installed successfully.');

console.log('Starting dev server...');
