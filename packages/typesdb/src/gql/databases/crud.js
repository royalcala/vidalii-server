import { getConnection } from "typeorm"
import {
    Not, LessThan, LessThanOrEqual, MoreThan,
    MoreThanOrEqual, Equal, Like, Between, In, Any,
    IsNull
} from "typeorm";
const iterateFilter = ({ filter }) => {
    let key
    for (key in filter) {
        let value = filter[key]
        if (Array.isArray(value))

            if (typeof value === 'object')
                iteratefilter({ acc, filter })
    }
}
export const find = async ({ connectionName, schemaName, filter = {} }) => {
    // console.log('filter1::', filter)
    // iterateFilter({ filter })
    // console.log('filter2::', filter)
    // https://typeorm.io/#/find-options
    return getConnection(connectionName)
        .getRepository(schemaName)
        .find(filter)
}
export const insert = async ({ connectionName, schemaName, doc }) => {
    //doc [] for many or {} for one
    let response = await getConnection(connectionName)
        .createQueryBuilder()
        .insert()
        .into(schemaName)
        .values(doc)
        .execute()
    return response.identifiers
}

export const update = () => {

}



// https://typeorm.io/#select-query-builder/getting-the-generated-query
// const sql = createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .getSql();