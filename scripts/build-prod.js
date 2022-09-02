
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const jsx = require('rollup-plugin-jsx');
const html = require('@rollup/plugin-html');
const less = require('rollup-plugin-less');

import postcss from 'rollup-plugin-postcss'


// import resolve from "rollup-plugin-node-resolve";
// import rollup from "rollup";
// import babel from "rollup-plugin-babel";
// import { terser } from "rollup-plugin-terser";

(async () => {
    const bundle = await rollup.rollup({
        input: 'src/swiper.js',
        external: ['swiper', 'vue'],
        plugins: [
            resolve(),
            commonjs(),
            postcss({
                plugins: []
            }),
            less(),
            jsx({ factory: 'React.createElement' }),
            babel({
                exclude: '**/node_modules/**', presets: ['@vue/babel-preset-jsx'],
            }),
            html(),
            terser(),
        ],
    });

    // Create the UMD version
    await bundle.write({
        file: 'dist/swiper23vue.js',
        sourcemap: true,
        format: 'umd',
        name: 'SwiperForVue',
    });

    // Create the ESM version
    await bundle.write({
        file: 'dist/swiper23vue.mjs',
        sourcemap: true,
        format: 'esm',
    });

})();