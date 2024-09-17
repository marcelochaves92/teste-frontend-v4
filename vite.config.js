/** @type {import('vite').UserConfig} */

import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        vue(),
        vuetify({
            autoImport: true,
        }),
    ],
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`,
            '@./': `${path.resolve(__dirname, 'src/components')}/`
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    define: { 'process.env': {} },
    server: {
        port: 3000,
    },
})
