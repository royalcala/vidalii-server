// const uuid = require('uuid/v1');
export default () => {
    const store = {}
    return {
        getStore: () => store,
        add: ({ tableName, _id, parent_id, data }) => {
            data['_id'] = _id
            if (parent_id !== null) {
                //is type='extended'
                data['parent_id'] = parent_id
            }

            // if (data.hasOwnProperty('parent_id')) { //if is table.type=extended
            //     data['parent_id'] = parent_id
            // }
            if (!store.hasOwnProperty(tableName))
                store[tableName] = []
            store[tableName].push(data)
            return _id
        },
        exec: async ({ trx }) => {
            let promises = []
            let tableName
            for (tableName in store) {
                while (store[tableName].length) {
                    promises.push(trx.insert(store[tableName].splice(0, 499)).into(tableName))
                }
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
