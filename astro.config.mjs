import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  site: 'http://localhost:4321',
  adapter: node({ mode: 'standalone' }),
  integrations: [solid()],
});
