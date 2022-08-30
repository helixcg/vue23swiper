
const resolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
const { terser } = require('rollup-plugin-terser');
const babel = require('rollup-plugin-babel');

(async () => {
    const bundle = await rollup.rollup({
        input: 'src/swiper.js',
        plugins: [
            resolve(),
            terser(),
            babel({
                presets: ['@vue/babel-preset-jsx'],
            }),
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