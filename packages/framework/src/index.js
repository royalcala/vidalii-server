import { reducer } from "./graphql/service/tools/reducerPaths";
import { fetchDirectivesFiles } from "./transpiler/fetchFiles";
// import startServer from "./server";
import {
     buildTemplate,
     getImports,
     transpiler,
     sdlExtract
} from "./transpiler";
const { parse } = require("@graphql/language");


export const buildProyect = ({ typeTemplate, rootPath, sdls = [] }) => {

}
export const buildDeveloperMode = ({ typeTemplate, rootPath, overwrite = false, sdls = [] }) => {
     //create directories and files
     //create cloud files
     //ast
     const { sdl } = reducer(sdls)
     const ast = parse(sdl)
     const { directives } = sdlExtract(ast)
     fetchDirectivesFiles(`${rootPath}/src/cloud`, directives)
     buildTemplate({ typeTemplate, rootPath, overwrite })
}

export const buildProductionMode = () => {

}


// export const startProyect = ({ sdls = [] }) => {
//     const Sdl = reducer(sdls)
//     console.log('%cSdl:', 'color: #807160', Sdl);
//     //fetch from cloud directives
//     //fetch from cloud scalars
//     //init directives
//     //init
//     //startServer
//     //load cloud in internal proyect
// }
// export default async function startServices({ ormConfig, port, gqlConfig }) {
//     await createConnection(ormConfig)
//     await createLocalFetch({
//         port
//     })
//     await startServer({
//         port,
//         plugins: [
//             apolloService(gqlConfig)
//         ]
//     })
// }