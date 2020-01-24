const getResolversQueries = oResolvers => {
    return oResolvers
}
const getResolversMutations = oResolvers => {
    return oResolvers
}
const getResolversTypes = oResolvers => {
    return oResolvers
}
const getSDL_from_oMutations = oMutations => {
    let sdl = ''
    Object.entries(oMutations).forEach(
        ([nameMutation, { args, typeReturn }]) => {
            args = args === null ? '' : args
            sdl = sdl.concat(`${nameMutation}${args}:${typeReturn}\n`)
        }
    )
    return sdl
}

const getSDL_from_oQueries = oQueries => {
    let sdl = ''
    Object.entries(oQueries).forEach(
        ([nameQuery, { args, typeReturn }]) => {
            args = args === null ? '' : args
            sdl = sdl.concat(`${nameQuery}${args}:${typeReturn}\n`)
        }
    )
    return sdl
}

const getSDL_from_oTypes = oTypes => {
    let sdl = ''
    Object.entries(oTypes).forEach(
        ([nameType, fields]) => {
            sdl = sdl.concat(`type ${nameType}{\n`)
            Object.entries(fields).forEach(
                ([nameField, { typeField }]) => {
                    sdl = sdl.concat(`${nameField}:${typeField}\n`)
                }
            )
            sdl = sdl.concat(`}\n`)
        }
    )
    return sdl
}

//schema definition language:sdl
export default ({ storeGql }) => {
    // console.log('storeGql::', storeGql)
    const sdlTypes = getSDL_from_oTypes(storeGql.sdl.types)
    const sdlQueries = getSDL_from_oQueries(storeGql.sdl.queries)
    const sdlMutations = getSDL_from_oMutations(storeGql.sdl.mutations)
    const resolversTypes = getResolversTypes(storeGql.resolvers.types)
    const resolversMutations = getResolversMutations(storeGql.resolvers.mutations)
    const resolversQueries = getResolversQueries(storeGql.resolvers.queries)
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