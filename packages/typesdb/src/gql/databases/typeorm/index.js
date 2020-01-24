import { startInstancesConnections } from './connections'
export const C_TYPEORM = 'typeorm'

const main = () => {
    return {        
        init: () => {
            return startInstancesConnections()

        }
    }
}

export default main()