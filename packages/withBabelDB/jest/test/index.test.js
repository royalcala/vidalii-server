import connection from '../connection'
import tableTests from './table'
import modelsTests from './models'

describe('root.index', () => {
    var table, models
    beforeAll(async () => {
        // console.log('before1 ')
        // console.log('beforeAll:', connection)
        // var connection = connection.table
        // console.log('connection::', connection)
        // table = global.table
        table = await connection.table
        global.table = connection.table
        global.models = await connection.models

        // console.log('models', models)

    });
    afterAll(async () => {
        console.log('afterAll:')
        var close1 = await table.docs.close()
        var close2 = await table.rev.close()
        var close3 = await table.seq.close()
        console.log('close-3-3:', close1, close2, close3)

    });
    tableTests()
    // modelsTests()
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

