

module.exports = ({ databases }) => {
    const index = require('./index')({
        databases
    })
    test('databases_models', async () => {
        expect(index).toEqual(
            expect.any(Object)
        );
        
        // const processData = require('../../index.test.data').get()
        // console.log('processData::',processData)
        // processData.databases_models.map(
        //     x => {
        //         // test create data,
        //         //get data and check
        //     }
        // )
    })



    return index

}