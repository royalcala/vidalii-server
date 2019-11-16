// import connection from '../connection'

// import modelsTests from './models'
import initTable from '../../src'
import { configTable as config } from '../../src/example_init_data'
import * as globalFxs from '../../src/globalFxs'
import dbTests from './db'
import modelTests from './model'

const fs = require('fs-extra')
const removeDataBase = ({ pathDB, db }) => {
    const completePath = pathDB + '/' + db
    fs.removeSync(completePath)
    var existDir = fs.existsSync(completePath)
    if (existDir)
        console.log(`Removed error in ${db}`)
    else
        console.log(`The path of ${db} was removed`)
}

describe('root.index', () => {
    var table, model, db
    beforeAll(async () => {
        // console.log('in jest/connection')

        var instanceTable = await initTable({
            config,
            fxs: { ...globalFxs }
        })
        db = instanceTable.db
        global.db = db

        global.model = instanceTable.model
        // console.log('instanceTable',instanceTable)

    });
    afterAll(async () => {
        // console.log('afterAll:')
        // console.log('db.isOpen():', db.docs.isOpen())
        // console.log('db.isClosed():', db.docs.isClosed())
        var close1 = await db.rev.close()
        var close2 = await db.seq.close()
        var close3 = await db.docs.close()
        console.log('close-3-3:', close1, close2, close3)
        // 

        removeDataBase({ pathDB: config.tables.docs.path, db: 'docs' })
        removeDataBase({ pathDB: config.tables.seq.path, db: 'seq' })
        removeDataBase({ pathDB: config.tables.rev.path, db: 'rev' })
    });
    // test('test', () => {
    //     expect(true).toEqual(true)
    // })

    dbTests()
    modelTests()

    // describe('table', () => {
    //     test('has:docs,rev,seq?', async () => {
    //         expect(Object.keys(table)).toEqual(expect.arrayContaining(
    //             ['docs', 'rev', 'seq']
    //         ));
    //     })
    //     test('has:docs.tac,[etc].tac?', async () => {
    //         for (var nameTable in table) {
    //             expect(
    //                 Object.keys(table[nameTable])
    //             ).toEqual(expect.arrayContaining(
    //                 ['tac']
    //             ));
    //         }

    //     })
    //     tableTests()
    // })

    // describe('models', () => {
    //     test('has:docs,rev,seq?', async () => {
    //         expect(Object.keys(table)).toEqual(expect.arrayContaining(
    //             ['docs', 'rev', 'seq']
    //         ));
    //     })
    //     test('has:docs.tac,[etc].tac?', async () => {
    //         for (var nameTable in table) {
    //             expect(
    //                 Object.keys(table[nameTable])
    //             ).toEqual(expect.arrayContaining(
    //                 ['tac']
    //             ));
    //         }

    //     })
    //     tac()
    // })
})

