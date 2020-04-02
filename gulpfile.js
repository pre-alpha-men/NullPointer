const gulp = require('gulp');
const rollup = require('rollup');
const vueLoader = require('rollup-plugin-vue');
const cssLoader = require('rollup-plugin-css-only');

gulp.task('build', async function () {
    const bundle = await rollup.rollup({
        input: './src/mt-ui/index.js',
        plugins: [
            cssLoader(),
            vueLoader({
                css: false,
                template: {
                    transpileOptions: {
                        target: {
                            chrome: 63
                        }
                    }
                },
                style: {
                    preprocessOptions: {
                        "less": {
                            compress: true,
                        },
                    },
                }
            })
        ],
        external: (id) => {
            if (id.endsWith("utils.js")) return true;
        },
    });
  
    await bundle.write({
        file: './dist/mt-ui/index.js',
        format: 'esm'
    });
});