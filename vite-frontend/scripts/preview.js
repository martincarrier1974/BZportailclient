#!/usr/bin/env node
import { spawn } from 'child_process';

const port = process.env.PORT || '8080';
const host = '0.0.0.0';

console.log(`🚀 Starting Vite preview on ${host}:${port}`);

const vite = spawn('vite', ['preview', '--host', host, '--port', port], {
  stdio: 'inherit',
  shell: true,
});

vite.on('error', (error) => {
  console.error('❌ Error starting Vite:', error);
  process.exit(1);
});

vite.on('exit', (code) => {
  process.exit(code || 0);
});

