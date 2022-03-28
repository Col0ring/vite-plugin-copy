import { Plugin } from 'vite'
import * as fse from 'fs-extra'
import { posix as path } from 'path'
import * as glob from 'glob'
import * as chalk from 'chalk'

export interface TargetObject {
  isDir?: boolean
  path: string
}
export interface CopyOptions {
  src: string[] | string
  target: string[] | string | TargetObject | TargetObject[]
}

function isTargetObject(
  target: string[] | string | TargetObject | TargetObject[]
): target is TargetObject {
  return typeof target === 'object'
}

function copyFile(src: string, target: string, isDir: boolean) {
  const targetFile = isDir ? path.join(target, path.basename(src)) : target
  try {
    if (isDir) {
      fse.copySync(src, targetFile)
    } else {
      fse.copySync(src, target)
    }
    console.log(chalk.green(`Copy successfully: ${src} > ${targetFile}`))
  } catch (error) {
    console.log(chalk.red(`Copy failed: ${src} > ${targetFile}`))
    console.error(error)
  }
}

/**
 *
 * @param options {from: to}
 * @returns: Plugin
 */
function vitePluginCopy(
  options: CopyOptions[],
  globOptions?: glob.IOptions
): Plugin {
  return {
    name: 'vite-plugin-copy',
    apply: 'build',
    closeBundle() {
      const cacheMap: Record<string, string[]> = {}
      options.forEach(({ src, target }) => {
        const srcArr = Array.isArray(src) ? src : [src]
        const targetArr = Array.isArray(target) ? target : [target]
        srcArr.forEach((s) => {
          let sourceFiles = cacheMap[s]
          if (!sourceFiles) {
            sourceFiles = glob.sync(s, globOptions)
            cacheMap[s] = sourceFiles
          }
          sourceFiles.forEach((sourceFile) => {
            targetArr.forEach((t) => {
              if (isTargetObject(t)) {
                const { isDir, path: pathname } = t
                copyFile(sourceFile, pathname, isDir ?? !path.extname(pathname))
              } else {
                copyFile(sourceFile, t, !path.extname(t))
              }
            })
          })
        })
      })
    }
  }
}
export { vitePluginCopy }
export default vitePluginCopy
