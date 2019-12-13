console.clear()
console.log('uuid-lexint')
const uuidv1 = require('uuid/v1');
// console.log('uuidv1()::',uuidv1())

var arr = []
var pos = []
for (let index = 0; index < 10000; index++) {
    var id = uuidv1()
    arr.push(id)
    pos.push(id)
}

// var puntos = [1, 10, 2, 21];
// console.log('puntos.sort()::', puntos.sort())
// console.log('arr::', arr)
// console.log('pos::', pos)
arr.sort()
var allEquals = []
for (let index = 0; index < arr.length; index++) {
    // console.log('arr::', arr[index])
    // console.log('pos::', pos[index])
    if (pos[index] === arr[index]) {
        // console.log('true::')
        allEquals.push(true)
    } else {
        // console.log('false')
        allEquals.push(false)
    }
}
console.log('allEquals.every(e=>e===true)::',allEquals.every(e=>e===true))
console.log('arr[arr.length-1]::',arr[arr.length-1])
console.log('pos[pos.length-1]::',pos[pos.length-1])
// var puntos = [1, 10, 3, 2, 21];
// console.log('puntos.sort()::', puntos.sort())
// console.log('puntos::', puntos)

// var array1 = [true, true, true]
// console.log('array1.every(e => e === true)::', array1.every(e => e === true))