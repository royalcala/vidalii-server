import rev from './rev'
import seq from './seq'
export default () => {
    describe('model', () => {
        var model
        beforeAll(async () => {
            // console.log('before2')
            model = await global.model
            // console.log('model::',model)
        });
        test('has:seq,rev?', async () => {
            expect(Object.keys(model)).toEqual(expect.arrayContaining(
                ['seq', 'rev']
            ));
        })
        seq()
        rev()

    })
}