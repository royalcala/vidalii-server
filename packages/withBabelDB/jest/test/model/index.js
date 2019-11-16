import rev from './rev'
import seq from './seq'
export default () => {
    describe('model', () => {
        var model
        beforeAll(async () => {
            // console.log('before2')
            model = await global.model

        });
        test('has:rev,seq?', async () => {
            expect(Object.keys(model)).toEqual(expect.arrayContaining(
                ['rev', 'seq']
            ));
        })
        rev()
        seq()
    })
}