import { _ID_DB } from '../src/configs'

export default () => {

    describe('configs', () => {
        let config
        beforeAll(async () => {
            idb = global.idb
        });

        test('containt the props', async () => {
            config = idb.getConfig()
            expect(config).toEqual(
                expect.objectContaining({
                    _id_db: expect.any(String),
                    maxVersions: expect.any(Number)
                }),
            )
        })
    })

}