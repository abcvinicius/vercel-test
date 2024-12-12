import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    [react()],
    
    VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts',
      exportName: 'app',
      tsCompiler: 'esbuild'
    })
  ]
});