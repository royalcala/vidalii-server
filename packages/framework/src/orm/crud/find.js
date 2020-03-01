import { getConnection } from "typeorm"
import { applyFilters } from './applyFilters'
export default async ({ connection = 'default', model, filter }) => {
    applyFilters({ filter })
    console.log('%cfilter2:', 'color: #917399', filter);
    console.log(typeof filter)
    let newOne = JSON.stringify(filter)
    console.log('%cNewOne::', 'color: #ffa640', newOne);
    newOne = JSON.parse(newOne)
    // https://typeorm.io/#/find-options
    // let getsql = await getConnection(connectionName)
    //     .getRepository(schemaName)
    //     .find({_id:0})
    // console.log('getsql::', getsql)

    // let hola = { where: { id: 2 } }
    // console.log('%cHola:', 'color: #00b300', hola);
    let response = await getConnection(connection)
        .getRepository(model)
        // .find(filter)
        .find(newOne)
    // .find({ ...filter })
    // .find({ where: { id: 2 } })
    // .find(hola)
    // console.log('%cResponse', 'color: #d90000', response);
    return response
}