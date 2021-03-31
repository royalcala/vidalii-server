import { orm, api, val, ObjectId } from "@vidalii/backend";


@orm.Entity()
export class apps {
    @orm.PrimaryKey()
    _id: string

    @orm.Property()
    name: string

    @orm.Unique()
    @orm.Property()
    port: number


    @orm.Property()
    git: string

}