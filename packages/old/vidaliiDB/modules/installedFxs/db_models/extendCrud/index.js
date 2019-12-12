
module.exports = ({ crud, shardName }) => {
    const extendedResult = {
        shard: {
            name: shardName
        }
    }
    return {
        insertOne: async (newDoc = {}, options = {}) => {
            let result = await crud.insertOne(newDoc, options)
            return {
                ...result,
                extendedResult
            }
        },
        get: async (id) => {
            let result = await crud.get(id)
            return {
                ...result,
                extendedResult
            }
        },
    }
}