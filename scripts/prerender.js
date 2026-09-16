import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

// Render the same App used by the browser; no parallel SEO-only content tree.
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const path = new URL('../dist/index.html', import.meta.url);
  const template = await readFile(path, 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('Prerender root placeholder missing');
  await writeFile(path, template.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
  console.log('Prerendered the portfolio into dist/index.html');
} finally {
  await server.close();
}
