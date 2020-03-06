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
  plugins: [
    // ["ramda"],
    ["@babel/plugin-syntax-dynamic-import"],
    ["module-resolver", {
      // "root": ["./src"],
      "alias": {
        "@vidalii": "./src",
        //"npm.(.+)": ([, name]) => `${name}`,
        "@cloud": "./src/cloud",
        "@scalar-json": "graphql-type-json",
        "@orm": "typeorm",
        "@jsonwebtoken": "jsonwebtoken",
        "@apollo": "apollo-server-fastify",
        "@graphql": "graphql",
        "@graphql-tag": "graphql-tag",
        "@fs-extra": "fs-extra",

        //previous
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