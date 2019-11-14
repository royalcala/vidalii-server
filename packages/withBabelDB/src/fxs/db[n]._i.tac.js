// import newFxs from './db.crud.tac.newFxs'
// import { evolCompose } from '@vidalii/evol'

// const mergeInDB = ({ init_db, reduce_dbs_assoc }) => {
//     for (var i in init_db) {
//         // console.log(i)        
//         init_db[i].tac = reduce_dbs_assoc[i].withoutEncoder
//         init_db[i].tace = reduce_dbs_assoc[i].withEncoder
//     }
//     return init_db
// }

// const reduce_dbs_assoc = ({ init_db, assoc_newFxs }) => reduce(
//     assoc_newFxs,
//     {}
// )(toPairs(init_db))

// const assoc_newFxs = ({ newFxs, encoders }) => (acc, [nameTable, valueTable]) => assoc(
//     nameTable,
//     newFxs({
//         nameTable, valueTable, encoder: ifElse(
//             has(nameTable),
//             () => encoders[nameTable],
//             () => encoders.default
//         )(encoders)
//     }),
//     acc
// )


// export default evolCompose(
//     ['mergeInDB', mergeInDB],
//     ['reduce_dbs_assoc', reduce_dbs_assoc],
//     ['assoc_newFxs', assoc_newFxs],
//     ['newFxs', newFxs]
// )(
//     children => children.mergeInDB
// )
const addTac = ({ db, standarizedResponse }) => ({
    put: async (key, value) => {
        var error = null
        var data = null
        try {
            var response = await db.put(
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
            var response = await db.get(
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
            var response = await db.del(
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

})
export default (n) => ({ db, fxs: { standarizedResponse } }) => {

    return addTac({
        db: db[n],
        standarizedResponse
    })
}