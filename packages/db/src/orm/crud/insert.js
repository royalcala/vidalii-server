import { getConnection } from "typeorm"
export default async ({ connection = 'default', model, data }) => {
    //data [] for many or {} for one
    // let response = await getConnection(connection)
    //     .createQueryBuilder()
    //     .insert()
    //     .into(model)
    //     .values(data)
    //     .execute()
    try {
        let rows = Array.isArray(data) ? data : [data]

        let promises = []
        await getConnection(connection).transaction(async transactionalEntityManager => {
            while (rows.length) {
                promises.push(
                    transactionalEntityManager
                        .createQueryBuilder()
                        .insert()
                        .into(model)
                        // .values(data.splice(0, 999))
                        .values(rows.splice(0, 499))
                        .execute()
                )
            }
        });

        let response = await Promise.all(promises)
        return {
            inserted: true,
        }
    } catch (error) {        
        throw new Error(error)
    }
    // let sqlquery = await getConnection(connectionName)
    //     .createQueryBuilder()
    //     .insert()
    //     .into(schemaName)
    //     .values(data)
    //     .getSql()
    // let sqlquery = await getConnection(connectionName)
    //     .createQueryBuilder()
    //     .update(schemaName)
    //     .set({ name: 'hellow' })
    //     // .where("id = :id", { _id: 1 })
    //     .where({ _id: 1 ,name:'2'})
    //     .getSql()
    // console.log('sqlquery::', sqlquery)    
}
