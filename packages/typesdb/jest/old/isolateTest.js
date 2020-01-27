import schemadb from '../src'
import { int, string } from '../src/leafTypes'
console.log('in isolateTest')

const fs = require('fs-extra')
export const removeDataBase = ({ location }) => {
    fs.removeSync(location)
    var existDir = fs.existsSync(location)
    if (existDir)
        console.log(`Removed error in ${location}`)
    else
        console.log(`The path of ${location} was removed`)
}
async function start() {
    const location = './isolate.sqlite'
    removeDataBase({ location })
    const db = await require('knex')({
        client: 'sqlite3',
        connection: {
            filename: location
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