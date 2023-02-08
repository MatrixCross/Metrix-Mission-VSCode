import { defineConfig } from 'vite';
import path from 'path';
import presets from './presets/presets';

const resolve = (dir) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [...presets],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve('./src'),
            },
        ],
    },
    base: 'https://file%2B.vscode-resource.vscode-cdn.net/e%3A/mycode/Metrix-Mission-VSCode/src/vue/dist/',
});
