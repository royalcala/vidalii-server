export default ({ nameTable, valueTable, standarizedResponse }) => ({
    put: async (key, value) => {
        var error = null
        var data = null
        try {
            var response = await valueTable.put(key, value)
            data = 'ok'
        } catch (e) {
            error = {
                msg: e + `.Error inserting a data on ${nameTable}.put(${key},${value}) `
            }
        }
        return standarizedResponse({
            error,
            data
        })


    },
    get: async (key) => {
        var error = null
        var data = null
        try {
            var response = await valueTable.get(key)
            data = {
                key,
                value: response
            }
        } catch (e) {
            error = {
                msg: e + `.Error  ${nameTable}.get(${key})`
            }
        }
        return standarizedResponse({
            error,
            data
        })


    },
    del: async (key) => {
        var error = null
        var data = null
        try {
            var response = await valueTable.del(key)
            data = 'deleted'
        } catch (e) {
            error = {
                msg: e + `.Error deleting a data on ${nameTable}.del(${key}) or not found `
            }
        }
        return standarizedResponse({
            error,
            data
        })


    }
})
