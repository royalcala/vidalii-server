import { api } from "@vidalii/backend/dist";
import { apps as appsEntity } from "./apps.entity";


enum StatusApp {
    ON = "ON",
    OFF = "OFF"
}
api.registerEnumType(StatusApp, {
    name: "StatusApp", // this one is mandatory
    description: "The Status of the App", // this one is optional
})

@api.Resolver(of => appsEntity)
export class AppRessolver {
    @api.Mutation(r => Boolean)
    appStart(
        @api.Arg('id') id: string,
    ) {

    }

    @api.Mutation(r => Boolean)
    appStop(
        @api.Arg('id') id: string,
    ) {

    }

    appStatus(
        @api.Arg('id') id: string
    ) {
        //check the port if is running/used
    }

}