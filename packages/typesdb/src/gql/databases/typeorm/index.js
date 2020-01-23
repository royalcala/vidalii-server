import { instanceConnections } from './connections'
export const C_TYPEORM = 'typeorm'

const main = () => {
    return {
        get: () => store,
        syncSchemas: async () => {
            await instanceConnections()

        }
    }
}

export default main()