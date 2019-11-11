
describe('root.index', () => {
    var table
    beforeAll(() => {
        console.log('beforeAll:')
        var connection = require('../jest/connection').default.table
        // console.log('connection::', connection)

        // table = global.table
        table = connection


    });
    afterAll(async () => {
        console.log('afterAll:')
        // var close1 = await table.docs.close()
        // var close2 = await table.rev.close()
        // var close3 = await table.seq.close()
        // console.log('close-3-3:', close1, close2, close3)
    });
    test('test1', async () => {
        var response = await table.docs.tac.put('1', { first: 1 })
        expect(response.error).toEqual(null)
    })
    test('test2', async () => {
        var response = await table.docs.tac.put('1', { first: 1 })
        expect(response.error).toEqual(null)
    })
})

