const R = require('ramda')
console.clear()
console.log('on testing fx')
// var id = '111-111-111-1111'
// var rev = '1'
// var store = {}

// store[`${id}!${rev}`] = 'inProcess'
// console.log(store)
// console.log(store.hasOwnProperty(`${id}!${rev}`))
// delete store[`${id}!${rev}`]
// console.log(store)
// console.log(store.hasOwnProperty(`${id}!${rev}`))

const queue = () => {
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


const evol = (...fxs) => (initialValue) => {
    // var store = {}
    return R.pipe(
        R.reduce(
            (accStore, [alias, fx]) => {

                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            initialValue
        )
    )(fxs)
}

const fx1 = ({ queue }) => {
    queue.addQueue({ _id: 1, _rev: 1 })
    return ''
}
const fx2 = ({ queue }) => {
    console.log(queue.checkExistQueue({ _id: 2, _rev: 1 }))
    console.log(queue.checkExistQueue({ _id: 1, _rev: 1 }))
    return ''
}
const list = [
    ['queue', queue],
    ['fx1', fx1],
    ['fx2', fx2]
]
evol(...list)({})