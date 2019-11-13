// export { default as tac } from "./tac"
import tac from './tac'
import tace from './tace';
import queryStream from './queryStream'

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
        test('has:docs.tac,[etc]...?', async () => {
            for (var nameTable in table) {
                expect(
                    Object.keys(table[nameTable])
                ).toEqual(expect.arrayContaining(
                    ['tac']
                ));
            }

        })
        test('has:docs.queryStream,[etc]...?', async () => {
            for (var nameTable in table) {
                expect(
                    Object.keys(table[nameTable])
                ).toEqual(expect.arrayContaining(
                    ['queryStream']
                ));
            }

        })
        tac()
        tace()
        queryStream()
    })
}