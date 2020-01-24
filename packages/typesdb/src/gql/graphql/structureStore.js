export const initStore = () => ({
    sdl: {
        types: {},
        queries: {},
        mutations: {
            // sdl: `${name}(data:JSON!):${name}`
        }
    },
    resolvers: {
        types: {},
        queries: {},
        mutations: {
            // [name]: async (parent, input) => {
            //     let result = await mutation(input.data)
            //     console.log('resultMutation::', result)
            //     if (result.error !== null)
            //         throw new Error(result.error)
            //     else
            //         return {}
            // }
        }
    }
})

export const populateStore = ({ sdl, resolvers, store }) => ({
    sdl: {
        type: sdl.type({ storeTypes: store.sdl.types }),
        query: sdl.query({ storeQuery: store.sdl.queries }),
        mutation: sdl.mutation({ storeMutation: store.sdl.mutations })
    },
    resolvers: {
        mutation: resolvers.mutation({ storeMutation: store.resolvers.mutations }),
        query: resolvers.query({ storeQuery: store.resolvers.queries }),
        type: resolvers.type({ storeTypes: store.resolvers.types }),
    }
})