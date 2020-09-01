import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from '@rollup/plugin-json';


const fs = require('fs');

const PRODUCTION = process.env.NODE_ENV === 'production';


export default [
    {
        input: [
            'test.ts'
        ],
        output: {
            dir: 'compiled',
            entryFileNames: 'test.js',
            format: 'system',
            sourcemap: true,
            chunkFileNames: 'bundle-[hash].js'
        },
        manualChunks: {},
        plugins: [
            json(),
            // progress(),
            nodeResolve({
                browser: true,
                preferBuiltins: true,
                mainFields: ['module', 'main', 'jsnext:main']
            }),
            commonjs({
                sourceMap: false,
                namedExports: {
                    'node_modules/@aws-crypto/sha256-js/build/index.js': ['Sha256'],
                    'node_modules/@aws-crypto/sha256-browser/build/index.js': ['Sha256'],
                    'node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/@aws-sdk/client-comprehend/node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/@aws-sdk/client-translate/node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/@aws-amplify/pubsub/node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/@aws-amplify/analytics/node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/@aws-amplify/datastore/node_modules/uuid/index.js': ['v1', 'v4'],
                    'node_modules/lodash/dist/lodash.js': ['isEmpty', 'isEqual', 'get'],
                    'node_modules/js-cookie/src/js.cookie.js': ['set', 'get', 'remove'],
                    'node_modules/paho-mqtt/paho-mqtt.js': ['Client'],
                    'node_modules/@aws-sdk/middleware-retry/node_modules/uuid/index.js': ['v4'],
                }
            }),
            typescript({
                typescript: require('typescript'),
                tsconfig: "tsconfig.json",
                tsconfigOverride: {
                    compilerOptions: {
                        module: "esnext"
                    }
                }
            }),
        ]
    },
]
