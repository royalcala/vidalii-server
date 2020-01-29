import { removeDataBase } from '../../removeDatabase'
import StoreTypes from '../src/backend/typedefs'

export default () => {
    describe('gqlStyleProgramming', () => {
        // const port = 3000
        // const url = `http://localhost:${port}/graphql`
        // let location = __dirname + '/ischemaql.sqlite'
        // const { int, string, ref, uuid, relation } = types
        beforeAll(async () => {
            // removeDataBase({ location })


        })
        it('StoreTypes', () => {
            expect(StoreTypes.getStore()).toEqual(expect.any(String))
            expect(StoreTypes.getGql()).toEqual(expect.objectContaining({
                kind: 'Document',
                definitions: expect.any(Array)
            }))
        })
        it('StoreResolvers', () => {
            
        })

    })
}