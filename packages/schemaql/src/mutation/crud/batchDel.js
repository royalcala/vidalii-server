
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
                    console.log('before warming of returning()')
                    promises.push(trx.del({_id}).into(tableName).where({ _id }))
                })
            }
            try {
                console.log('before warming of returning2()')
                let rPromises = await Promise.all(promises)  
                console.log('before warming of returning3()')              
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