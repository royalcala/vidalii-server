import { api, getDataLoader, Context } from "@vidalii/backend"
import { JsonScalar } from "@vidalii/backend/dist/scalars/Json"
import { Auth } from "../session/session.decorator.api";
import { User } from "../user/user.api"
import { usergroup } from "./group.entity"
import { Groups } from "./group.enum.api";
@api.Resolver(of => User)
export class UserGroupResolver {

    //QUERY
    @api.Query(returnType => [Groups])
    @Auth.Query([Groups.admin])
    groupList() {
        return Object.values(Groups)
    }

    @api.FieldResolver(returnType => [Groups])
    @Auth.Query([Groups.admin])
    async groups(
        @api.Root() user: User,
        @api.Ctx() context: Context
    ) {
        const group = await context.em.findOne(usergroup, { id_user: user._id })
        return group.group
        //one to many
        // const groups = (await context.em.find(usergroup, { id_user: user._id }))
        //     .map(
        //         value => value.id_group
        //     )

        // const userGroup = getDataLoader(group, 'User.group', '_id', context)

        // return userGroup.loadMany(groups)
    }

    //MUTATIONS
    // @api.Mutation(returnType => Boolean)
    // async userGroupInsert(
    //     @api.Arg("id_user") id_user: string,
    //     @api.Arg("group") id_group: string,
    //     @api.Ctx() context: Context
    // ) {
    //     const ug = new usergroup().pre_persist()
    //     ug.id_user = id_user
    //     ug.id_group = id_group
    //     context.em.persist(usergroup)
    // }
}