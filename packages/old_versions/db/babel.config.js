module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ]
  ],
  "plugins": [
    ["ramda"],
    ["@babel/plugin-syntax-dynamic-import"],
    // ["module-resolver", {
    //   "root": ["./"],
    //   // "alias": {
    //   //   "test": "./test",
    //   //   "underscore": "lodash"
    //   // }
    // }]
    ['babel-plugin-root-import', {
      "rootPathPrefix": "#"
    }]
  ]
};