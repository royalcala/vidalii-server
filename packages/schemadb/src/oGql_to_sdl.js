import { mergeDeepRight } from 'ramda'

const getResolversQueries = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        obj => {
            resolvers = {
                ...resolvers,
                ...obj
            }
        }
    )
    return resolvers
}
const getResolversMutations = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        obj => {
            resolvers = {
                ...resolvers,
                ...obj
            }
        }
    )
    return resolvers
}
const getResolversTypes = oResolvers => {
    let resolvers = {}
    oResolvers.forEach(
        ({ path, fx }) => {
            let propertyName = path.pop()
            let nameObj = path.join('_')

            resolvers = mergeDeepRight(resolvers, {
                [nameObj]: {
                    [propertyName]: fx
                }
            })
        }
    )

    return resolvers
}
const getSDL_from_oMutations = oMutations => {
    let sdl = ''
    oMutations.forEach(
        obj => {
            sdl = sdl.concat(`${obj.sdl}\n`)
        }
    )
    return sdl
}

const getSDL_from_oQueries = oQueries => {
    let sdl = ''
    oQueries.forEach(
        obj => {
            sdl = sdl.concat(`${obj.sdl}\n`)
        }
    )
    return sdl
}

const getSDL_from_oTypes = oTypes => {
    let sdl = ''
    Object.entries(oTypes).forEach(
        ([nameType, fields]) => {
            // console.log('nameType::', nameType)
            // console.log('fields::', fields)
            sdl = sdl.concat(`type ${nameType}{\n`)
            fields.forEach(
                obj => {
                    sdl = sdl.concat(`${obj.nameField}:${obj.typeField}\n`)
                }
            )
            sdl = sdl.concat(`}\n`)
        }
    )
    return sdl
}

//schema definition language:sdl
export default ({ oGql }) => {    
    const sdlTypes = getSDL_from_oTypes(oGql.types)
    const sdlQueries = getSDL_from_oQueries(oGql.queries)
    const sdlMutations = getSDL_from_oMutations(oGql.mutations)
    const resolversTypes = getResolversTypes(oGql.resolvers.types)
    const resolversMutations = getResolversMutations(oGql.resolvers.mutations)
    const resolversQueries = getResolversQueries(oGql.resolvers.queries)
    return {
        sdl: {
            types: sdlTypes,
            queries: sdlQueries,
            mutations: sdlMutations
        },
        resolvers: {
            types: resolversTypes,
            queries: resolversQueries,
            mutations: resolversMutations
        }
    }
}