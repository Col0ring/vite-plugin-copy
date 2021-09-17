import { Plugin } from 'vite';
import * as glob from 'glob';
export interface TargetObject {
    isDir?: boolean;
    path: string;
}
export interface CopyOptions {
    src: string[] | string;
    target: string[] | string | TargetObject | TargetObject[];
}
/**
 *
 * @param options {from: to}
 * @returns: Plugin
 */
declare function vitePluginCopy(options: CopyOptions[], globOptions?: glob.IOptions): Plugin;
export { vitePluginCopy };
export default vitePluginCopy;
