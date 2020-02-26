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
    return response
}