import { transformFileSync, transformSync } from '@babel/core';
// import * as t from "@babel/types"; //visitors types here
//https://babeljs.io/docs/en/next/babel-types.html
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
//https://dev.to/lgraziani2712/i-wrote-my-first-babel-plugin-and-it-wasnt-that-hard-4f9h

export const getImports = pathProyect => {
  const imports = {}
  glob.sync(pathProyect).forEach(pathFile => {
    // const realPath = fs.realpathSync(path)
    const strFile = fs.readFileSync(fs.realpathSync(pathFile), 'utf8').toString()
    const output = transformSync(
      strFile,
      {
        plugins: [
          function myCustomPlugin() {
            return {
              visitor: {
                ImportDeclaration(path) {
                  imports[path.node.source.value] = ''
                  // console.log('import:', path.node.source.value)
                  // if (path.node.source.value === 'vue-types') {
                  //   path.remove();
                  // }
                },
              },
            };
          },
        ],
      });
  })
  return imports

}
export const transpiler = (pathProyect) => {

}
