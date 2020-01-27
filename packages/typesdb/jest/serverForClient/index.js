// import { removeDataBase } from '../../../removeDatabase'
import { schemas, dbs, gql } from '../../src/backend'
import { types } from '../../src/backend'
const { int, string, ref, uuid, relation } = types



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

