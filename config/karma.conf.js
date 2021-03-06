'use strict';

const path = require('path');
const ts = require('rollup-plugin-typescript');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const angular = require('rollup-plugin-angular');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');

module.exports = function karmaConfig(config) {
    var configuration = {
        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: '../',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-rollup-plugin'),
            require('karma-phantomjs-launcher')
        ],
        reporters: [
            // // Reference: https://github.com/mlex/karma-spec-reporter
            // // Set reporter to print detailed results to console
            // 'spec',
            // // Reference: https://github.com/karma-runner/karma-coverage
            // // Output code coverage files
            // 'coverage'
            'progress'
        ],
        // list of files / patterns to load in the browser we are building
        // the config environment in ./karma-shim.js
        files: [
            'config/karma-shim.ts'
        ],
        preprocessors: {
            'config/karma-shim.ts': ['rollup']
        },
        rollupPreprocessor: {
            context: 'this',
            plugins: [
                angular({
                    exclude: 'node_modules/**'
                }),
                ts({
                    typescript: require('../node_modules/typescript')
                }),
                alias({
                    '@angular/core/testing': path.resolve(__dirname, '../node_modules/@angular/core/testing/index.js'),
                    '@angular/platform-browser-dynamic/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser-dynamic/testing/index.js'),
                    '@angular/compiler/testing': path.resolve(__dirname, '../node_modules/@angular/compiler/testing/index.js'),
                    '@angular/platform-browser/testing': path.resolve(__dirname, '../node_modules/@angular/platform-browser/testing/index.js')
                }),
                commonjs(),
                nodeResolve({ jsnext: true, main: true, browser: true }),
                buble()
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
         // Continuous Integration mode if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    };

    // if(process.env.GITLAB_CI){
    //     //configuration.browsers = ['Chrome_travis_ci'];
    // }

    config.set(configuration);
};

