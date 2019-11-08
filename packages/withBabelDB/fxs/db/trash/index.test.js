import db from './index'

export default ({ config }) => {
    var index = null
    describe('fxs.db', () => {
        index = db({ config })
        test('containing .docs,.rev,.seq', () => {
            expect(index).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })

    })
    return index

}
