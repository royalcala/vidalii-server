const R = require('ramda')
console.clear()
console.log('start testNewFx')

const add = (b) => (d) => a + b + c + d;
const curried_add = R.curry(add);
// const uncurried_add = R.uncurryN(2)



// const storeOnParams = (store) => (params) => R.pipe(
//     x => {
//         store.a = store.a + params
//     },
//     x => store
// )(params)
// console.log(
//     storeOnParams({ a: 1 })(10)
// )

// const a = data => b(1) + 100

// const b = data => a(1) + 10


// console.log(
//     b(0)
// )