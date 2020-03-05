// import { reducer } from "./graphql/service/tools/reducerPaths";
// import startServer from "./server";
import { buildTemplate } from "./transpiler";


export const buildProyect = ({ typeTemplate, rootPath }) => {
     buildTemplate(typeTemplate, rootPath)
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