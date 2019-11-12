// export { default as tac } from "./tac"
import tac from './tac'


export default () => {
    describe('table', () => {
        var table
        beforeAll(async () => {
            // console.log('before2')
            table = global.table

        });
        test('has:docs,rev,seq?', async () => {
            expect(Object.keys(table)).toEqual(expect.arrayContaining(
                ['docs', 'rev', 'seq']
            ));
        })
        test('has:docs.tac,[etc].tac?', async () => {
            for (var nameTable in table) {
                expect(
                    Object.keys(table[nameTable])
                ).toEqual(expect.arrayContaining(
                    ['tac']
                ));
            }

        })
        tac()
    })
}