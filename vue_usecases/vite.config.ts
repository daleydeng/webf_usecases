import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Use relative paths for assets
  build: {
    target: 'esnext',
    cssCodeSplit: false, // 禁用CSS代码分割
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/index.js', 
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          // 图片资源保持原始名字
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/i.test(info)) {
            return 'assets/[name][extname]';
          }
          // 其他资源使用简化名字
          return 'assets/index[extname]';
        },
        inlineDynamicImports: true, // 内联动态导入
        manualChunks: undefined // 禁用手动分块
      }
    }
  },
  resolve: {
    alias: {
      // `@openwebf/vue-cupertino-ui` is typings-only (no runtime JS entry). We alias it to a
      // local shim so production builds can bundle enum values like `CupertinoIcons`.
      '@openwebf/vue-cupertino-ui': fileURLToPath(new URL('./src/shims/openwebf-vue-cupertino-ui.ts', import.meta.url)),
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('webf-') || tag.startsWith('flutter-'),
        },
      },
    }),
  ],
})
