import { defineConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginCopy from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginCopy([
      // {
      //   src: resolve('./dist/index.html'),
      //   target: resolve('./dist/index2.html')
      // },
      {
        src: [resolve('./dist/index.html')],
        target: [resolve('./dist/index2.html'), resolve('./dist/index3.html')]
      },
      {
        src: [resolve('./dist/index.html'), resolve('./dist/assets')],
        target: [resolve('./dist/dist2'), resolve('./dist/dist3')]
      },
      {
        src: resolve('./dist/assets/**/*'),
        target: {
          path: resolve('./dist/assets2')
        }
      }
      // {
      //   src: [resolve('./dist/assets/**/*')],
      //   target: {
      //     isDir: false,
      //     path: resolve('./dist/assets2')
      //   }
      // }
    ])
  ],
  resolve: {
    alias: {
      '@src': resolve('./src'),
      '@examples': resolve('./examples')
    }
  }
})
