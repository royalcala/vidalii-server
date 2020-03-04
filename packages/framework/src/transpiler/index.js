import { transformFileSync, transformSync } from '@babel/core';
const buildTemplate = require('./templates')
const fs = require('fs-extra')

// console.log('%cBabel::', 'color: #00b300', babel.transformSync);
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/

// const code = 'const n = 1';
// // const codeWithSourceMap = 
// // // '"use strict";\n' +
// // // '\n' +
// // // '/*my first commet*/\n' +
// // // 'const x = 1;\n' +
// // '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVua25vd24iXSwibmFtZXMiOlsibiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTUEsQ0FBQyxHQUFHLENBQVYiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBuID0gMSJdfQ=='


// const output = transformSync(
//   code,
//   // codeWithSourceMap,
//   {
//     // ast: true,
//     // auxiliaryCommentAfter: "my first commet",
//     sourceMaps: "inline",
//     // inputSourceMap:true,
//     // presets: ["minify"],
//     plugins: [
//       // your first babel plugin 😎😎
//       function myCustomPlugin() {
//         return {
//           visitor: {
//             Identifier(path) {
//               // in this example change all the variable `n` to `x`
//               if (path.isIdentifier({ name: 'n' })) {
//                 path.node.name = 'x';
//               }
//             },
//           },
//         };
//       },
//     ],
//   });

// console.log(output); // 'const x = 1;'
// console.log('transpiler')

const transpiler = ({ sdls = [], template = 'microservice' } = {}) => {
    const path = fs.realpathSync('.') + '/output/proyect1'
    buildTemplate('microservice', path)

}
// console.log(fs.realpathSync('.'))