//**server**
import startServer from "./fastify";
//**graphql**
import apolloService from "../graphql/service/apollo.fastify";
//**orm**
import createConnection from "../orm/service/startConnection";
//**fetch**
import { createLocalFetch } from "../graphql/service/fetch";

// const { scalars, directives, types, queries, mutations, sdls, context } = gqlConfig
export default async function startServices({ ormConfig, port, gqlConfig }) {
    await createConnection(ormConfig)
    await createLocalFetch({
        port
    })
    await startServer({
        port,
        plugins: [
            apolloService(gqlConfig)
        ]
    })
}

//1.- read sdls
//2.- insert defulat _Directives{ hellow:String @hellow}