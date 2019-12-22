import subdb from '@vidalii/subdb'
import encapsulatedb from '@vidalii/encapsulatedb'
import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import { removeDataBase } from '../../removeDatabase'
import { pipe } from 'ramda'



import test_singleIndexing from './singleIndexing'
import test_sqlite from './sqlite'
const leveldown = require('leveldown')
const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
jest.setTimeout(30000);
describe('indexingdb', () => {
    let db, data_db
    let location = './testDB'
    beforeAll(async () => {
        //leveldb
        removeDataBase({ location })
        //sqlite
        removeDataBase({ location: './mydb.sqlite' })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })


        data_db = pipe(
            subdb({ prefix: 'data' }),
            encodingdb(codecs),
        )(db)


        global.db = db
        global.data_db = data_db
        var sqlite3 = require('sqlite3').verbose();

        let sqlitedb = new sqlite3.Database("./mydb.sqlite")
        // let sqlitedb = new sqlite3.Database(':memory:');
        global.sqlitedb = sqlitedb
        global.sampleSize = 1000000

    });
    afterAll(async () => {
        await db.close()
    })
    //12810
    test_singleIndexing()
    test_sqlite()


})