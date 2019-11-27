const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');



console.log(uuidv1())
console.log(uuidv1())
// console.log(new Date())


// console.log(
//     uuidv5('hello.example.com', uuidv5.DNS)
// )
// console.log(
//     uuidv5('hello.example.com', uuidv5.DNS)
// )


// var d = new Date();
// console.log('d::', d)
// var n = d.getTime();
// console.log('n::', n)

// function uuidv4() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

// console.log(uuidv4());

// console.log('Math.floor(Date.now() / 1000)::', Math.floor(Date.now() / 1000))
