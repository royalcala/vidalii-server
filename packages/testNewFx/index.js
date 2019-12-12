console.clear()
console.log('in testNewFx db')
// let s = '\xff'
// console.log('s::', s)
// const levelup = require('levelup')
// const memdown = require('memdown')

// const db = levelup(memdown())

// db.put('hey', { hi: 'world' }, (err) => {
//     if (err) throw err

//     db.get('hey', { asBuffer: false }, (err, value) => {
//         if (err) throw err
//         console.log(value) // 'you'
//     })
// })

// db.createReadStream({
//     keyAsBuffer: false,
//     valueAsBuffer: false
// }).on('data', console.log)

// let obj1 = {
//     a: [
//         { b: 1 }
//     ]
// }
// console.log('obj1.a.b::', obj1.a[0].b)

// var createTree = require("functional-red-black-tree")

// let table = {
//     'key1': { data1: 1, data2: 2 },
//     'key2': { data1: 21, data2: 22 }
// }
// //Create a tree
// var t1 = createTree()

// //Insert some items into the tree
// var t2 = t1.insert('key1', table['key1'])
// var t3 = t2.insert('key2', table['key2'])

// t3.forEach(
//     (key, value) => {
//         console.log('key:', key, ',value:', value)
//     }
// )
// table['key1'] = 'change'

// t3.forEach(
//     (key, value) => {
//         console.log('key:', key, ',value:', value)
//     }
// )



// const value = {
//     hellow: 'world'
// }
// const fxc = ({ store, id, rev }) => {
//     store.set({ id: 1, rev }, value)
// }

// let initKey = { id: 99, rev: 99 }
// const fx = () => {
//     let store = new Map();
//     store.set(initKey, 'first value')
//     let rev = 0
//     return {
//         add: () => {
//             rev++
//             store.set({ id: 1, rev }, value)
//         },
//         two: () => {
//             rev++
//             fxc({ store, rev })
//         },
//         getStore: () => store,
//         getOne: key => store.get(key)
//     }
// }

// const one = fx()

// one.add()
// one.two()
// // console.log('one.getStore()::', one.getStore())
// value.hello2 = 'world2'
// console.log('one.getStore()::', one.getStore())
// console.log('getOne(1)::', one.getOne({ id: 99, rev: 99 }))
// console.log('getOne(1)::', one.getOne(initKey))

// for (var [clave, valor] of one.getStore()) {
//     console.log(clave + " = " + valor);
// }

// var iterator1 = one.getStore()[Symbol.iterator]();

// for (let item of iterator1) {
//   console.log(item);
// }