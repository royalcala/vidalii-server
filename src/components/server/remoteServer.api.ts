import { api, Context, fetch } from "@vidalii/backend";
import { remoteServer as remoteServerEntity } from "./remoteServer.entity";
import { RemoteServerSSH } from "./remoteServer.install";

@api.ObjectType()
export class RemoteServer {
    @api.Field()
    _id: string
}


@api.Resolver(of => RemoteServer)
export class RemoteServerResolver {

    @api.Mutation(r => String)
    async remoteServerInstall(
        @api.Arg("id") id: string,
        @api.Ctx() context: Context
    ) {
        const server = await context.em.findOneOrFail(remoteServerEntity, id)
        try {
            const isRunning = await fetch.request(`http://${server.dns}/graphql`, `{}`)
            return `The server is running`
        } catch (error) {
            const msServer = new RemoteServerSSH(server)
            return msServer.start_server_by_ssh()
        }


    }

    remoteServerStart() {

    }

    remoteServerStop() {

    }
}