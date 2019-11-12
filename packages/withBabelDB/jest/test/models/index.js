// export { default as tac } from "./tac"
import seq from './seq'


export default () => {
    describe('models', () => {
        var models
        beforeAll(async () => {
            // console.log('before2')
            models = await global.models

        });
        test('has:seq?', async () => {
            expect(Object.keys(models)).toEqual(expect.arrayContaining(
                ['seq']
            ));
        })
        // test('has:docs.tac,[etc].tac?', async () => {
        //     for (var nameTable in table) {
        //         expect(
        //             Object.keys(table[nameTable])
        //         ).toEqual(expect.arrayContaining(
        //             ['tac']
        //         ));
        //     }

        // })
        seq()
    })
}