import { getConnection } from "typeorm"
// import {
//     Not, LessThan, LessThanOrEqual, MoreThan,
//     MoreThanOrEqual, Equal, Like, Between, In, Any,
//     IsNull
// } from "typeorm";
// const iterateConditions = ({ conditions }) => {
//     let key
//     for (key in conditions) {
//         let value = conditions[key]
//         if (Array.isArray(value))

//             if (typeof value === 'object')
//                 iterateConditions({ acc, conditions })
//     }
// }
export const find = async ({ connectionName, schemaName, conditions = {} }) => {
    iterateConditions({ conditions })
    // https://typeorm.io/#/find-options
    return getConnection(connectionName)
        .getRepository(schemaName)
        .find(conditions)
}
export const insertOne = async ({ connectionName, schemaName, doc }) => {
    return getConnection(connectionName)
        .createQueryBuilder()
        .insert()
        .into(schemaName)
        .values(doc)
        .execute()

}

export const updateOne = () => {

}



// https://typeorm.io/#select-query-builder/getting-the-generated-query
// const sql = createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .getSql();