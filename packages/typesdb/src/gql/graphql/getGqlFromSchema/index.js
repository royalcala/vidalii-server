import { initStore, populateStore } from '../structureStore'
import { sdl, resolvers } from '../composition'
import schemas from '../../schemas'
import { onType } from './onType'
import {onTypeExtend} from './onTypeExtend'


export default () => {
    const store = initStore()
    const addToStore = populateStore({ sdl, resolvers, store })

    let storeSchemas = schemas.get()
    let nameSchema
    for (nameSchema in storeSchemas) {
        onType({
            nameType: nameSchema,
            type: storeSchemas[nameSchema],
            addToStore
        })
        if (storeSchemas[nameSchema].extend)
            onTypeExtend({
                typeExtend: storeSchemas[nameSchema].extend,
                nameType: nameSchema,
                addToStore
            })
    }

    return store

}