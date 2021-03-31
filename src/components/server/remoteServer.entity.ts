import { api, orm, ObjectId, val } from "@vidalii/backend/dist";


@api.InputType('remoteServerInsert')
@orm.Entity()
export class remoteServer {
    async pre_persist() {
        this._id = new ObjectId().toHexString()
        // this.password = await hash(this.password)
        return this
    }
    @orm.PrimaryKey()
    _id: string


    @val.IsIP()
    @api.Field()
    @orm.Property()
    ip: string

    @val.IsUrl()
    @api.Field()
    @orm.Property()
    dns: string

    @orm.Property()
    @api.Field()
    ssh_user: string


    @api.Field()
    @orm.Property()
    ssh_password: string

}