import subdb from '@vidalii/subdb'
import encapsulatedb from '@vidalii/encapsulatedb'
import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import { removeDataBase } from '../../removeDatabase'
import { pipe } from 'ramda'



import test_singleIndexing from './singleIndexing'
import test_sqlite from './sqlite'
import test_pouchdb from './pouchdb'
import test_nanosql from './nanosql'

const leveldown = require('leveldown')
const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
jest.setTimeout(10000);
describe('indexingdb', () => {
    let db, data_db
    let location = './testDB'
    beforeAll(async () => {
        //leveldb
        removeDataBase({ location })
        //sqlite
        removeDataBase({ location: './mydb.sqlite' })
        //pouchdb
        removeDataBase({ location: './pouchdb' })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })


        data_db = pipe(
            subdb({ prefix: 'data' }),
            encodingdb(codecs),
        )(db)


        global.db = db
        global.data_db = data_db
        global.sampleSize = 300000
        var sqlite3 = require('sqlite3').verbose();

        let sqlitedb = new sqlite3.Database("./mydb.sqlite")
        // let sqlitedb = new sqlite3.Database(':memory:');
        global.sqlitedb = sqlitedb
        const PouchDB = require('pouchdb');
        PouchDB.plugin(require('pouchdb-find'));
        global.pouchdb = new PouchDB('./pouchdb');
    });
    afterAll(async () => {
        await db.close()
    })
    //12810
    // test_singleIndexing()
    test_sqlite()
    // test_pouchdb()
    // test_nanosql()


})