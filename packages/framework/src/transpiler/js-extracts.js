import { transformFileSync, transformSync } from '@babel/core';
const glob = require('glob')
const fs = require('fs-extra')
const Path = require('path');
// import * as t from "@babel/types"; //visitors types here
//https://babeljs.io/docs/en/next/babel-types.html
// https://lihautan.com/step-by-step-guide-for-writing-a-babel-transformation/
//https://dev.to/lgraziani2712/i-wrote-my-first-babel-plugin-and-it-wasnt-that-hard-4f9h
//https://github.com/jamiebuilds/babel-handbook
export const jsExtracts = pathProyect => {
    const imports = {}
    glob.sync(pathProyect).forEach(pathFile => {
        // console.log('%c⧭', 'color: #f200e2', pathFile);
        // const realPath = fs.realpathSync(pathFile)
        // const strFile = fs.readFileSync(fs.realpathSync(pathFile), 'utf8').toString()
        const output = transformFileSync(
            pathFile,
            {
                plugins: [
                    function myCustomPlugin() {
                        return {
                            visitor: {
                                DeclareModule(path){
                                    console.log('DeclareModule:', 'color: #731d6d', path.node.source.value);
                                },
                                DeclareModuleExports(path){
                                    console.log('%DeclareModuleExports:', 'color: #731d6d', path.node.source.value);
                                },
                                // ModuleDeclaration(path){
                                //     console.log('%ModuleDeclaration:', 'color: #731d6d', path.node.source);
                                // },
                                // ModuleSpecifier(path){
                                //     console.log('%ModuleSpecifier:', 'color: #731d6d', path.node);
                                // },
                                // TSExternalModuleReference(path){
                                //     console.log('%TSExternalModuleReference:', 'color: #731d6d', path.node.source.value);
                                // },
                                // TSModuleBlock(path){
                                //     console.log('%TSModuleBlock:', 'color: #731d6d', path.node.source.value);
                                // },
                                // TSModuleDeclaration(path){
                                //     console.log('%TSModuleDeclaration:', 'color: #731d6d', path.node.source.value);
                                // },
                                VariableDeclaration(path) {

                                },
                                ImportDeclaration(path) {
                                // console.log('%cImport:', 'color: #731d6d', path.node.source.value);

                                //     //Extract the filename, but leave the file extension:
                                //     var filename = Path.basename(path.node.source.value, '.js');
                                //     imports[filename] = ''
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
    return { imports }

}