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

var d = new Date();
console.log('d::',d)
var n = d.getTime();
console.log('n::',n)

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  console.log(uuidv4());

  console.log('Math.floor(Date.now() / 1000)::',Math.floor(Date.now() / 1000))