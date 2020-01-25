import { removeDataBase } from '../../removeDatabase'
// import schemaql from '../src'

// import test1 from './test1'
// import test_structure from './structureSchema'
// import test_mutation from './mutation'
// import test_knex from './knex'
// import test_schemaql from './schemaql'


// import test_instance_schemaql from './i_schemaql'
import test_instance_schemaql_graphql from './i_schemaql_graphql'
// import test_typeorm from './typeorm'
// jest.setTimeout(1000000);
describe('schemaql', () => {
    // let db
    // let location = __dirname + '/db.sqlite'

    beforeAll(async () => {
        // removeDataBase({ location })  
        // const Database = require('better-sqlite3');
        // db = new Database('./better.sqlite', { verbose: console.log });
        // db = new Database(location)
        // db = require('knex')({
        //     client: 'sqlite3',
        //     connection: {
        //         filename: location
        //     },
        //     useNullAsDefault: true
        // });
        // global.db = db
        global.sampleSize = 100
        // global.schemaql = schemaql

    });
    afterAll(async () => {
        // await db.close()
        // process.exit(1)
    })

    // test1()
    // test_structure()
    // test_mutation()
    // test_schemaql()
    // test_knex()
    // test_typeorm()
    // test_instance_schemaql()
    test_instance_schemaql_graphql()
})