import buildTemplate from "./templates";
import { getImports, transpiler } from "./babel.outFile";
import { sdlExtract } from "./sdl-extracts";
import { reducer } from "../graphql/service/tools/reducerPaths";
import { fetchDirectives, fetchImportsLib } from "./fetchFiles";
import { jsExtracts } from "./js-extracts";
const { parse } = require("@graphql/language");
export const buildDeveloperMode = ({ typeTemplate, rootPath, overwrite = false, sdls = [] }) => {
    buildTemplate({ typeTemplate: 'cloud', rootPath, overwrite })
    const { sdl } = reducer(sdls)
    const ast = parse(sdl)
    const dirCloud = `${rootPath}/src/cloud`
    //write /cloud/directives.*
    const { directives } = sdlExtract(ast)
    fetchDirectives(dirCloud, directives)
    //write /cloud/lib.*
    const { imports } = jsExtracts(`${rootPath}/src/cloud/*.js`)
    // console.log('%cimports:', 'color: #731d1d', imports);
    fetchImportsLib(dirCloud, imports)
    //write /npm packages on npm
}

export const buildProductionMode = () => {

}

const instance = () => {
    const store = {
        typeTemplate: 'cloud',
        rootDir: '',
        overwrite: false,
        sdls: [],
    }
    return {
        create: (storeInit = {}) => {
            store = {
                ...store,
                ...storeInit,
                ast: null,
                sdlExtract: {}
            }
        }
    }
}
export default instance()