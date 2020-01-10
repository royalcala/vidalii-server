const uuid = require('uuid/v1');
export const delDoc = async ({ db, tableName, _id }) => {
    try {
        let response = await db(tableName)
            .where({ _id })
            .del()
        return response === 1 ?
            {
                error: null,
                data: 'Correct Deleted'
            } : {
                error: `Error:${response}. Cannot be deleted the _id:${_id}`,
                data: null
            }
    } catch (error) {
        return {
            error: 'Error.' + error,
            data: null
        }
    }

}
export const updateDoc = async ({ db, tableName, _id, dataToMutate }) => {
    try {
        let response = await db(tableName)
            .where({ _id })
            .update(dataToMutate)
        return response === 1 ?
            {
                error: null,
                data: 'Correct Updated'
            } : {
                error: `Error:${response}. Cannot be update the _id:${_id}`,
                data: null
            }
    } catch (error) {
        return {
            error: 'Error.' + error,
            data: null
        }
    }

}



export const batchInsert = () => {
    //store[tableName][array of each row]
    let store = {}

    return {
        getStore: () => store,
        add: ({ tableName, _id, parent_id, data }) => {
            data['_id'] = _id === null ? uuid() : _id
            if (parent_id !== null) { //if is table.type=extended
                data['parent_id'] = parent_id
            }
            store[tableName] = []
            store[tableName].push(data)
            return data['_id']
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


// export const insertDoc = async ({ db, tableName, _id, dataToMutate }) => {
//     if (_id === null)
//         dataToMutate['_id'] = uuid()
//     else
//         dataToMutate['_id'] = _id

//     try {
//         await db(tableName).insert(dataToMutate)
//         return {
//             data: [dataToMutate['_id']],
//             error: false
//         }
//     } catch (error) {
//         return {
//             error,
//             data: null
//         }
//     }
// }