import schemadb from '../src'
import { int, string } from '../src/leafTypes'
console.log('in isolateTest')

async function start() {
    const db = await require('knex')({
        client: 'sqlite3',
        connection: {
            filename: './isolate.sqlite'
        },
        useNullAsDefault: true
    })

    const schema = await schemadb({
        name: 'sales',
        schema: {
            folio: int(),
            salesPerson: string(),
            materials: {
                nameMaterial: string()
            },
            shipping: {
                to: string(),
                otherDBNested:{
                    ha:string()
                }
            }
        },
        db
    })

    await schema.startServer()
}

start()