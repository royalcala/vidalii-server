import subdb from '@vidalii/subdb'
import encapsulatedb from '@vidalii/encapsulatedb'
import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import { removeDataBase } from '../../removeDatabase'
import { pipe } from 'ramda'



import test_singleIndexing from './singleIndexing'

const leveldown = require('leveldown')
const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
describe('indexingdb', () => {
    let db, data_db
    let location = './testDB'
    beforeAll(async () => {
        removeDataBase({ location })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })


        data_db = pipe(
            subdb({ prefix: 'data' }),
            encodingdb(codecs),
        )(db)


        global.db = db
        global.data_db = data_db

    });
    afterAll(async () => {
        await db.close()
    })
    test_singleIndexing()



})