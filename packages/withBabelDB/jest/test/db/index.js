// export { default as tac } from "./tac"
import tac from './tac'
// import tace from './tace';
import query_stream from './query.stream'

export default () => {
    describe('db', () => {
        var db
        beforeAll(async () => {
            // console.log('before2:',global.db)
            db = global.db

        });
        test('has:docs,rev,seq?', async () => {
            // console.log('db::', db)
            expect(Object.keys(db)).toEqual(expect.arrayContaining(
                ['docs', 'rev', 'seq']
            ));
        })
        // test('has:docs.tac,[etc]...?', async () => {
        //     for (var namedb in db) {
        // expect(
        //     Object.keys(db[namedb])
        // ).toEqual(expect.arrayContaining(
        //     ['tac', 'query']
        // ));
        //     }

        // })
        test.each([
            ['docs'], ['rev'], ['seq']
        ])(
            "%p has [tac,query,encoder]",
            dbName => {
                expect(
                    Object.keys(db[dbName])
                ).toEqual(expect.arrayContaining(
                    ['tac', 'query', 'encoder']
                ));
            }
        );
        tac()
        // tace()
        query_stream()
    })
}