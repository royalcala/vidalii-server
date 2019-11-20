console.clear()
console.log('in testNewFx')
//Load the library
var createTree = require("functional-red-black-tree")

//Create a tree
var tree = createTree()



// console.log('tree::',tree)


// // tree= tree.insert(3, "foo")
// // tree = tree.insert(2, "bar")
// // tree = tree.insert(1, "bar")
var mil = 1000
var nmillon = (n)=>1000*1000*n

console.time('init array')
var arre = []
for (var i = nmillon(1); i > 0; i--) {
    // console.log(i)
    var value = Math.floor(Math.random() * 1000)
    arre.push([value, value])
}
console.timeEnd('init array')

console.time('tree')
arre.forEach(e => {
    tree = tree.insert(e[0], e[1])
});
console.timeEnd('tree')

console.time('sort')
arre.sort(function(a, b) {
    return a - b;
  });
console.timeEnd('sort')
console.log('tree.length::',tree.length)
// console.log('tree.end::',tree.end)
// tree.forEach(
//     (key, value) => {
//         console.log('lastValue',key, '::', value)
//     }
//     ,66
// )

// // 
// // tree = tree.insert('a', "bar")
// console.log('tree.length:', tree.length)
// console.log('tree.root::',tree.root)

// console.log('tree.keys::',tree.keys)
// console.log('tree.values::',tree.values)
// console.log('tree.get(4)::',tree.get(4))
// console.log('tree.finId(key)::',tree.find(10))
// console.log('tree.ge(8)::',tree.ge(8))

// console.log('tree.ge(8).keys::',tree.ge(1).hasNext)
// console.log('tree.ge(8).keys::',tree.gt(1).index)
// console.log('/*/*///*/:',
// tree.gt(50)
// )

// tree.forEach(
//     (key, value) => {
//         console.log('lastValue',key, '::', value)
//     }
//     ,tree.gt(51).index, tree.gt(51).index
// )
// var a = tree.ge(4)
// console.log('a::',a.next())
// console.log(tree)


// console.log('tree::',tree)
// //Remove something
// var t4 = t3.remove(1)
// console.log('t3:',t3)
