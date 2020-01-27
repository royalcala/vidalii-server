const main = () => {
    const store = {}
    return {
        get: () => {
            return store
        },
        add: schema => {
            try {
                if (store[schema.name])
                    throw new Error(`schema name duplicated ${schema.name} was replaced`)
                store[schema.name] = schema
                return {
                    error: null,
                    index: schema.name,
                    schema: store[schema.name],
                }


            } catch (error) {
                return {
                    error
                }
            }

        }
    }
}

export default main()