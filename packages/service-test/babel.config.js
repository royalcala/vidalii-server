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
    ["@babel/plugin-syntax-dynamic-import"],
    ["module-resolver", {
      // "root": ["./src"],
      "alias": {
        "site": "./src",
        "services": "./services",//change into src when its in production
        "@vidalii": "@vidalii/framework/src"
      }
    }]
  ]
};