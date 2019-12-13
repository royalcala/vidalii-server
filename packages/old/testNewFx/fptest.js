const { T, mergeDeepWith, pipe, cond, type, equals } = require('ramda')
console.clear()
console.log('::in testNewFx')
// var store = 'store1'
// const obj1 = {
//     put: () => {
//         return store
//     },
//     del: 2
// }

// const fx = (obj1) => {

//     return {
//         ...obj1,
//         get: 3
//     }
// }

// const instance = fx(obj1)

// instance.put = 0
// console.log('obj1::', obj1)
// console.log('instance::', instance)

const nodeIsArray = (l, r) => {
  console.log('l::',l)
  console.log('r::',r)

  return 'isArray'
}

const conditionalNode = cond([
  [pipe(type, equals('Array')), nodeIsArray],
  [T, () => 'is Not']
])



const updateJson = ({ prevDoc, newDoc }) => mergeDeepWith(conditionalNode, prevDoc, newDoc)


let prevDoc = {
  a: 1,
  b: [1, 2]
}

let newDoc = {
  a: '2',
  b: [3]
}

console.log('updateJson::', updateJson({ prevDoc, newDoc }))