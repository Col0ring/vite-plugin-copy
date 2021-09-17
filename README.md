# Vite-Plugin-Copy

A vite plugin for copying dirs or files after building.

## Install

```sh
npm install @col0ring/vite-plugin-copy -D
# or
yarn add @col0ring/vite-plugin-copy -D
```

## Usage

```js
import { defineConfig } from 'vite'
import path from 'path'
import viteCopyPlugin from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    // ...
    viteCopyPlugin([
      {
        src: resolve('./dist/index.html'),
        target: resolve('./dist/index2.html')
      }
    ])
  ]
})
```

The `src` and `target` options can accept arrays:

```js
import { defineConfig } from 'vite'
import path from 'path'
import viteCopyPlugin from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    // ...
    viteCopyPlugin([
      {
        src: resolve('./dist/index.html'),
        target: [resolve('./dist/index2.html'), resolve('./dist/index3.html')]
      }
    ])
  ]
})
```

```js
import { defineConfig } from 'vite'
import path from 'path'
import viteCopyPlugin from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    // ...
    viteCopyPlugin([
      {
        src: [resolve('./dist/index.html'), resolve('./dist/assets')],
        target: [resolve('./dist/dist2'), resolve('./dist/dist3')]
      }
    ])
  ]
})
```

The disk path supports `glob`:

```ts
import { defineConfig } from 'vite'
import path from 'path'
import viteCopyPlugin from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    // ...
    viteCopyPlugin([
      {
        // move all files in the src directory to the target directory
        src: resolve('./dist/assets/**/*'),
        target: resolve('./dist/assets2')
      }
    ])
  ]
})
```

Usually, the plugin will automatically recognize whether the copy is a directory or a file, but you can still specify it manually:

```ts
import { defineConfig } from 'vite'
import path from 'path'
import viteCopyPlugin from '@col0ring/vite-plugin-copy'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

export default defineConfig({
  plugins: [
    // ...
    viteCopyPlugin([
      {
        // this is a file
        src: resolve('./dist/file'),
        target: {
          isDir: false,
          path: resolve('./dist/file2')
        }
      }
    ])
  ]
})
```

## Delare

```ts
function vitePluginCopy(
  options: CopyOptions[],
  globOptions?: glob.IOptions
): Plugin
```

### CopyOptions

#### `src`

- Type: `string | string[]`

Resource file or directory.

#### `target`

- Type: `string | string[] | TargetObject | TargetObject[]`

Target file or directory.

```ts
interface TargetObject {
  isDir?: boolean
  path: string
}
```

### glob.IOptions

Custom glob configuration.
