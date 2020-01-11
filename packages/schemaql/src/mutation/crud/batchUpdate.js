
export default () => {
    const store = {}
    return {
        getStore: () => store,
        add: ({ tableName, _id, data }) => {            
            if (!store.hasOwnProperty(tableName))
                store[tableName] = []
            data['_id'] = _id
            store[tableName].push(data)
            return data['_id']
        },
        exec: async ({ trx }) => {
            let promises = []
            let tableName
            for (tableName in store) {
                store[tableName].forEach(({ _id, ...data }) => {
                    promises.push(trx.update(data).into(tableName).where({ _id }))
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