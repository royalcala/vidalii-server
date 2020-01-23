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