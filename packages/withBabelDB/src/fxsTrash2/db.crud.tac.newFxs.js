export default ({ parent: { fxs: { standarizedResponse } } }) =>
    ({ nameTable, valueTable, encoder }) => {
        const { keyEncoding, valueEncoding } = encoder
        return (
            {
                withEncoder: {
                    put: async (key, value) => {
                        var error = null
                        var data = null
                        var insertData = {
                            key: keyEncoding.encode(key),
                            value: valueEncoding.encode(value)
                        }

                        try {
                            var response = await valueTable.put(
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
                            var response = await valueTable.get(
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
                            var response = await valueTable.del(
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

                },
                withoutEncoder: {
                    put: async (key, value) => {
                        var error = null
                        var data = null
                        try {
                            var response = await valueTable.put(
                                key,
                                value
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
                        try {
                            var response = await valueTable.get(
                                key
                            )
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
                            var response = await valueTable.del(
                                key
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

                },
            }
        )
    }