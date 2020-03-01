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
    // ["ramda"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["module-resolver", {
      // "root": ["./src"],
      "alias": {
        "@scalars": "./src/graphql/scalars",
        "@crud": "./src/orm/crud"
        // "services": "./services",//change into src when its in production
        // "@vidalii": "@vidalii/framework/src"
      }
    }]
    // ['babel-plugin-root-import', {
    //   "rootPathPrefix": "#"
    // }]
  ]
};