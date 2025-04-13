// esbuild.config.js
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: ['functions/position/app.ts'],
    bundle: true,
    outfile: 'dist/position/app.js',
    platform: 'node',
    target: 'node20',
  })
  .catch(() => process.exit(1));
