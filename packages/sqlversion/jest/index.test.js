import { removeDataBase } from '../../removeDatabase'

import test_sqlite from './sqlite'
import test_knex from './knex'
import test_bettersql from './bettersql'

// jest.setTimeout(1000000);
describe('sqlite', () => {
    let db, data_db
    beforeAll(async () => {
        // let namedb = 'sqlite3.sqlite'
        removeDataBase({ location: './better.sqlite' })
        removeDataBase({ location: './sqlite3.sqlite' })
        removeDataBase({ location: './knex.sqlite' })
        global.sampleSize = 10

        const Database = require('better-sqlite3');
        // const db = new Database('./better.sqlite', { verbose: console.log });
        const db = new Database('./better.sqlite')
        global.bettersql = db

        // db.function('add2', (a, b) => a + b);

        // let result = db.prepare('SELECT add2(?, ?)').get(12, 4);
        // console.log('result::', result)

        // db.function('json_value', { deterministic: true, varargs: true }, (json_text, key) => json_text ? JSON.parse(json_text)[key] : null);

        // // const craeteTable = db.prepare(`
        // // CREATE TABLE IF NOT EXISTS posts2 (
        // //     idss integer PRIMARY KEY,
        // //     datajson json
        // //     )
        // // `);
        // // craeteTable.run()
        // const createIndex = db.prepare(`
        //             CREATE INDEX idx_datajson
        //             ON posts(json_value(datajson,'name') COLLATE NOCASE) 
        // `)
        // createIndex.run()

        // db.close()
        let sqlite3 = require('sqlite3').verbose();

        let sqlitedb = new sqlite3.Database('./sqlite3.sqlite')
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
    test_bettersql()
    // test_knex()
    // test_pouchdb()
    // test_nanosql()


})