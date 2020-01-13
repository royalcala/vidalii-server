export default () => {
    var store = {}
    return {
        addQueue: ({ _id, _rev }) => {
            store[`${_id}!${_rev}`] = 'inProcess'
        },
        elimateQueue: ({ _id, _rev }) => {
            delete store[`${_id}!${_rev}`]
        },
        checkExistQueue: ({ _id, _rev }) => {
            return store.hasOwnProperty(`${_id}!${_rev}`)
        }
    }
}