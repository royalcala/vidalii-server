import { reducer } from "./graphql/service/tools/reducerPaths";
import startServer from "./server";
export const startProyect = ({ sdls = [] }) => {
    const Sdl = reducer(sdls)
    console.log('%cSdl:', 'color: #807160', Sdl);
    //init _Directives.onInit
    //init
    //startServer
}
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