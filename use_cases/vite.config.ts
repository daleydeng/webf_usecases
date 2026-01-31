import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: './',  // Use relative paths for assets
  publicDir: 'public',
  build: {
    // Keep CRA-compatible output folder name
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name || '';
          // 图片资源保持原始名字
          if (/\.(png|jpe?g|gif|svg|ico|webp)$/i.test(info)) {
            return 'assets/[name][extname]';
          }
          // 其他资源使用简化名字
          return 'assets/index[extname]';
        }
      }
    }
  },
  define: {
    // Provide NODE_ENV for libs expecting it
    'process.env.NODE_ENV': JSON.stringify(
      mode === 'production' ? 'production' : 'development'
    ),
  },
}));

