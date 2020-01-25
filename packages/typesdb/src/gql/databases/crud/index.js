import { getConnection } from "typeorm"
import { applyFilters } from './applyFilters'
export const find = async ({ connectionName, schemaName, filter }) => {
    console.log('connectionName::', connectionName)
    console.log('schemaName::', schemaName)
    console.log('filter2::', filter)
    applyFilters({ filter })
    console.log('filter3::', filter)
    // https://typeorm.io/#/find-options
    let response = await getConnection(connectionName)
        .getRepository(schemaName)
        .find(filter)
        console.log('response modify to get One::',response)
    return response
}
export const insert = async ({ connectionName, schemaName, doc }) => {
    //doc [] for many or {} for one
    let response = await getConnection(connectionName)
        .createQueryBuilder()
        .insert()
        .into(schemaName)
        .values(doc)
        .execute()
    // let sqlquery = await getConnection(connectionName)
    //     .createQueryBuilder()
    //     .insert()
    //     .into(schemaName)
    //     .values(doc)
    //     .getSql()
    // let sqlquery = await getConnection(connectionName)
    //     .createQueryBuilder()
    //     .update(schemaName)
    //     .set({ name: 'hellow' })
    //     // .where("id = :id", { _id: 1 })
    //     .where({ _id: 1 ,name:'2'})
    //     .getSql()
    // console.log('sqlquery::', sqlquery)
    return response.identifiers
}

export const update = async ({ connectionName, schemaName, doc }) => {
    // const { _id, ...otherData } = doc
    // let response = await getConnection()
    //     .createQueryBuilder()
    //     .update(User)
    //     .set(otherData)
    //     // .where("id = :id", { id: 1 })
    //     .where({ _id })
    //     .execute();
}



// https://typeorm.io/#select-query-builder/getting-the-generated-query
// const sql = createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .orWhere("user.lastName = :lastName", { lastName: "Saw" })
//     .getSql();