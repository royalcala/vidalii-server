import { getConnection } from "typeorm"
import { applyFilters } from './applyFilters'
export const find = async ({ connectionName, schemaName, filter = {} }) => {
    console.log('filter1::', filter)
    let result = applyFilters({ filter })
    console.log('result::', result)
    console.log('filter2::', filter)
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