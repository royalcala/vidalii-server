
export default () => {
    const store = {}
    return {
        getStore: () => store,
        add: ({ tableName, _id }) => {
            if (!store.hasOwnProperty(tableName))
                store[tableName] = []

            store[tableName].push(_id)
            return _id
        },
        exec: async ({ trx }) => {
            let promises = []
            let tableName
            for (tableName in store) {
                store[tableName].forEach((_id) => {
                    // promises.push(trx.del({_id}).into(tableName).where({ _id }))
                    promises.push(
                        trx(tableName).del({ _id }).where({ _id }).returning()
                    )
                })
            }
            try {
                await Promise.all(promises)
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