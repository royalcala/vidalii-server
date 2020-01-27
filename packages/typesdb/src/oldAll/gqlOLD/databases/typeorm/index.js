import { getConnections } from './connections'
export const C_TYPEORM = 'typeorm'

const main = () => {
    // const store = {
    //     entities: []
    // }
    return {
        get: () => store,
        syncSchemas: () => {
            let connections = getConnections()
            // let storeSchemas = schemas.get()
            // let connections = dbs.get().connections
            // let nameSchema
            // for (nameSchema in storeSchemas) {
            //     let nameDB = storeSchemas[nameSchema].db
            //     let typeDB = connections[nameDB]
            //     if (typeDB.orm === C_TYPEORM)
            //         addEntitieToStore({
            //             storeEntities: store.entities,
            //             schema: storeSchemas[nameSchema]
            //         })
            // }
            // console.log('store::', store)
        }
    }
}

export default main()