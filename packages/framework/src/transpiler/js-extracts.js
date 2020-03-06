import { transformFileSync, transformSync } from '@babel/core';
const glob = require('glob')
const fs = require('fs-extra')
const Path = require('path');
export const jsExtracts = pathProyect => {
    const imports = {}
    glob.sync(pathProyect).forEach(pathFile => {
        console.log('%c⧭', 'color: #f200e2', pathFile);
        // const realPath = fs.realpathSync(pathFile)
        // const strFile = fs.readFileSync(fs.realpathSync(pathFile), 'utf8').toString()
        const output = transformFileSync(
            pathFile,
            {
                plugins: [
                    function myCustomPlugin() {
                        return {
                            visitor: {
                                ImportDeclaration(path) {

                                    //Extract the filename, but leave the file extension:
                                    var filename = Path.basename(path.node.source.value, '.js');
                                    imports[filename] = ''
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