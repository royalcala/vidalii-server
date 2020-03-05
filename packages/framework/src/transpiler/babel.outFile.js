import { transformFileSync, transformSync } from '@babel/core';
// import * as t from "@babel/types"; //visitors types here
//https://babeljs.io/docs/en/next/babel-types.html
// const buildTemplate = require('./templates')
// const fs = require('fs-extra')

// console.log('%cBabel::', 'color: #00b300', babel.transformSync);
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
//https://dev.to/lgraziani2712/i-wrote-my-first-babel-plugin-and-it-wasnt-that-hard-4f9h

const code = `
import {hola} from 'rayos'
const _rayos = 'je'
const n = 1+hola
`;
// // const codeWithSourceMap = 
// // // '"use strict";\n' +
// // // '\n' +
// // // '/*my first commet*/\n' +
// // // 'const x = 1;\n' +
// // '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsibiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsQ0FBQyxHQUFHLENBQVYiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuID0gMSJdfQ=='


const output = transformSync(
  code,
  // codeWithSourceMap,
  {
    // ast: true,
    // auxiliaryCommentAfter: "my first commet",
    // sourceMaps: "inline",
    inputSourceMap:true,
    // presets: ["minify"],
    plugins: [      
      function myCustomPlugin() {
        return {
          visitor: {
            ImportDeclaration(path) {
              console.log('import:',path.node.source.value )
              if (path.node.source.value === 'vue-types') {
                path.remove();
              }
            },
            Identifier(path, ...others) {
              // console.log('path.node.name::',path.node.name)
              // console.log(path.type)
              // console.log('%cpath', 'color: #997326', Object.keys(path.node));
              // console.log('others::',others)

              // console.log('%cSource:', 'color: #bfffc8', path.node.source.value);
              // in this example change all the variable `n` to `x`
              if (path.isIdentifier({ name: 'n' })) {
                path.node.name = 'x';
              }
            },
          },
        };
      },
    ],
  });

console.log(output.code); // 'const x = 1;'
// console.log('transpiler')

// const transpiler = ({ sdls = [], template = 'microservice' } = {}) => {
//     const path = fs.realpathSync('.') + '/output/proyect1'
//     buildTemplate('microservice', path)

// }
// console.log(fs.realpathSync('.'))
export const transpiler = (pathProyect) => {

}