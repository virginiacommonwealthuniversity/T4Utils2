module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    globals: {
        'com': true,
        'content': true,
        'ContentHierarchy': true,
        'ContentManager': true,
        'currentSection': true,
        'dbStatement': true,
        'importClass': true,
        'importPackage': true,
        'isPreview': true,
        'java': true,
        'language': true,
        'MediaManager': true,
        'MediaUtils': true,
        'MessageDigest': true,
        'PathBuilder': true,
        'publishCache': true,
        'section': true,
        'T4Utils': true,
        'TreeTraversalUtils': true
    },
    ignorePatterns: [
        'dist/**/*.js',
        'node_modules/**/*.js'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        indent: ['warn', 4],
        'linebreak-style': ['warn', 'unix'],
        quotes: ['warn', 'single'],
        semi: ['warn', 'always'],
        'valid-jsdoc': ['error']
    }
};
