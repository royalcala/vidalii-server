import encapsulatedb from '@vidalii/encapsulatedb'
import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import { removeDataBase } from '../../removeDatabase'
import { pipe } from 'ramda'
import indexingdb from '../src'
import { defaultIndexing } from '../src/fxs'

const leveldown = require('leveldown')
const codecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
describe('indexingdb', () => {
    let db, idb
    let location = './testDB'
    beforeAll(async () => {
        removeDataBase({ location })
        db = await encapsulatedb({ store: leveldown, location: './testDB' })
        const indexes = [
            {
                nameIndex: 'default',
                fx: defaultIndexing([
                    ['folio'],
                    ['spec.size']
                    ['spec.color']
                ])
            }
        ]
        idb = pipe(
            indexingdb({ indexes, prefix: 'indexes' }),
            encodingdb(codecs)
        )(db)
        global.idb = idb
    });
    afterAll(async () => {
        await idb.close()
    })
    test('firstTest', async () => {
        let response = await idb.put('putOne', { folio: 1, spec: { size: 1, color: 'blue' } })
        console.log('response::', response)
        expect(response.error).toEqual(null)
        let getResponse = await idb.get('putOne')
        console.log('getResponse::', getResponse)
    })


})