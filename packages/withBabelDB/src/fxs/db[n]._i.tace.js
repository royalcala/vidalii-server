
const add_tace = ({ db, standarizedResponse }) => {
    const { keyEncoding, valueEncoding } = db.encoder
    return ({
        put: async (key, value) => {
            var error = null
            var data = null
            var insertData = {
                key: keyEncoding.encode(key),
                value: valueEncoding.encode(value)
            }

            try {
                var response = await db.put(
                    insertData.key,
                    insertData.value
                )
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
            var dataToGet = {
                key: keyEncoding.encode(key)
            }
            try {
                var response = await db.get(
                    dataToGet.key
                )
                data = {
                    key,
                    value: valueEncoding.decode(response)
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
                var response = await db.del(
                    keyEncoding.encode(key)
                )
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
}
export default (n) => ({ db, fxs: { standarizedResponse } }) => {

    return add_tace({
        db: db[n],
        standarizedResponse
    })
}