

export default () => {
    const store = {}
    return {
        get: () => store,
        add: schema => {
            try {
                if (store.hasOwnProperty(schema.name))
                    throw new Error(`schema name duplicated ${schema.name}`)
                store[schema.name] = schema

                return {
                    error: null
                }
            } catch (error) {
                return {
                    error
                }
            }

        }
    }
}