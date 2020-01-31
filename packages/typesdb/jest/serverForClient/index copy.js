import { schemas, dbs, gql } from '../../src/backend'
import { types } from '../../src/backend'
const { int, string, ref, uuid, relation } = types
import { removeDataBase } from './removeDatabase'



startServer()

async function startServer() {
    const port = 4000
    // const url = `http://localhost:${port}/graphql`
    let location = __dirname + '/reactTest.sqlite'
    // await removeDataBase({ location })
    await dbs.addConnection({
        name: 'nameDB',
        type: 'sqlite',
        database: location
    })
    
    // await schemas.add({
    //     name: 'sales',
    //     connection: 'nameDB',
    //     fields: {
    //         _id: uuid(({ primary: true }))
    //     }
    // })

    // await schemas.add({
    //     name: 'sales_materials',
    //     connection: 'nameDB',
    //     fields: {
    //         _id: uuid(({ primary: true })),
    //         materi: ref({
    //             schemaName:'sales',
    //             fieldName:,
    //             relation
    //         })
    //     }
    // })
    await schemas.add({
        name: 'catalogue_materials',
        connection: 'nameDB',
        fields: {
            _id: uuid(({ primary: true })),
            name: string()
        }
    })


    let response = await gql.startService({ port })
}

