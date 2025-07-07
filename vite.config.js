import tailwindcssPlugin from '@tailwindcss/vite';
import viteReactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import viteConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    reportCompressedSize: false,
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: {
      // Prevent Vite from bundling server-only or problematic Node modules
      external: [
        'fs',
        'path',
        'os',
        'module',
        'crypto',
        'stream',
        'util',
        'zlib',
        'net',
        'tls',
        'child_process'
      ],
    },
  },
  plugins: [
    tailwindcssPlugin(),
    viteConfigPaths(),
    viteReactPlugin(),
    process.env.INLINE ? viteSingleFile() : null,
  ].filter(Boolean),
});
