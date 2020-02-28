import { removeDataBase } from '../../removeDatabase'
import StoreSDL from '../src/instances/StoreSDL'
import StoreResolvers from '../src/instances/StoreResolvers'
// ctrl + j close terminal
// ctrl + shift + p + @ navigate on fx '' on files
export default () => {
    describe('gqlStyleProgramming', () => {
        // const port = 3000
        // const url = `http://localhost:${port}/graphql`
        // let location = __dirname + '/ischemaql.sqlite'
        // const { int, string, ref, uuid, relation } = types
        beforeAll(async () => {
            // removeDataBase({ location })

        })
        it('StoreSDL', () => {
            expect(StoreSDL.getStore()).toEqual(expect.any(String))
            expect(StoreSDL.getGql()).toEqual(expect.objectContaining({
                kind: 'Document',
                definitions: expect.any(Array)
            }))
        })
        it('StoreResolvers', () => {
            console.log('Stores::', StoreResolvers.getStore())
            // console.log(' StoreResolvers.getStore()::', Stores.resolvers.getStore())
        })
        it('GraphqlServiceRunning', async () => {

        })

    })
}