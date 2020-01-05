import { removeDataBase } from '../../removeDatabase'

import test_sqlite from './sqlite'
import test_knex from './knex'

jest.setTimeout(1000000);
describe('sqlite', () => {
    let db, data_db
    beforeAll(async () => {
        removeDataBase({ location: './sqlite3.sqlite' })
        removeDataBase({ location: './knex.sqlite' })
        global.sampleSize = 500000
        let sqlite3 = require('sqlite3').verbose();

        let sqlitedb = new sqlite3.Database("./sqlite3.sqlite")
        // let sqlitedb = new sqlite3.Database(':memory:');
        global.sqlitedb = sqlitedb
        global.knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: "./knex.sqlite"
            },
            useNullAsDefault: true
        });

    });
    afterAll(async () => {
        await db.close()
    })
    //12810
    // test_singleIndexing()
    // test_sqlite()
    test_knex()
    // test_pouchdb()
    // test_nanosql()


})