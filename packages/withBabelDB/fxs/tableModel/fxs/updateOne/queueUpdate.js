export default () => {
    var store = {}
    return {
        addQueue: ({ _id, _rev }) => {
            store[`${id}!${_rev}`] = 'inProcess'
        },
        elimateQueue: ({ _id, _rev }) => {
            delete store[`${id}!${_rev}`]
        },
        checkExistQueue: ({ _id, _rev }) => {
            return store.hasOwnProperty(`${id}!${_rev}`)
        }
    }
}