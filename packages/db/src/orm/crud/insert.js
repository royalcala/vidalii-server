import { getConnection } from "typeorm"
import { applyFilters } from './applyFilters'
export default async ({ connection = 'default', model, filter }) => {
    applyFilters({ filter })
    // https://typeorm.io/#/find-options
    // let getsql = await getConnection(connectionName)
    //     .getRepository(schemaName)
    //     .find({_id:0})
    // console.log('getsql::', getsql)

    let response = await getConnection(connection)
        .getRepository(model)
        .find(filter)
    console.log('response::', response)
    return response
}
export const insert = async ({ connection = 'default', model, doc }) => {
    //doc [] for many or {} for one
    // let response = await getConnection(connection)
    //     .createQueryBuilder()
    //     .insert()
    //     .into(model)
    //     .values(doc)
    //     .execute()
    let promises = []
    await getConnection(connection).transaction(async transactionalEntityManager => {
        while (doc.length) {
            promises.push(
                transactionalEntityManager
                    .createQueryBuilder()
                    .insert()
                    .into('category1')
                    .values(doc.splice(0, 999))
                    .execute()
            )
        }
    });

    try {
        await Promise.all(promises)        
    } catch (error) {
        // console.log('error::', error)
        throw new Error(error)
    }
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
