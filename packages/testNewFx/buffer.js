console.clear()
console.log('clean console.in buffer.js')

// const buf = Buffer.from('abc')
// console.log(buf)
// console.log(buf[0]) //97
// console.log(buf[1]) //98
// console.log(buf[2]) //99
// buf[0] = 99 //o
// console.log(buf)
// console.log(buf.toString())
// console.log(JSON.stringify(buf))

// const buf2 = Buffer.from({ type: "Buffer", data: [97, 98, 99] })
// console.log(
//     buf2.toString()
// )
// var obj = {
//     a: 1
// }
// var buf3 = Buffer.from(JSON.stringify(obj));

// console.log(
//     'buf3',
//     buf3
// )

// var temp = JSON.parse(buf3.toString());

// console.log(
//     'temp:',
//     temp
// )


// const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
// const json = JSON.stringify(buf);

// console.log(json);
// // Prints: {"type":"Buffer","data":[1,2,3,4,5]}

// const copy = JSON.parse(json, (key, value) => {
//     return value && value.type === 'Buffer' ?
//         Buffer.from(value.data) :
//         value;
// });

// console.log(copy);

// var b1 = Buffer.alloc(20);

// var b2 = Buffer.from('Mañana más');

// console.log('Este es mi buffer inicializado a cero');
// console.log(b1);
// console.log('----------------------------------------');
// console.log('Este es mi buffer creado con un string');
// console.log(b2);

// var buf2 = Buffer.from('abc', 'binary');

// console.log(buf2);
// var arr = [Buffer('1'), Buffer('2'), Buffer('10')];
// console.log(
//     arr.sort()
// )


// var arr2 = [1, 2, 3, 10]

// console.log(arr2.sort())
// console.log(
//     new Date()
// )

// var s = 'hi'

// var buff = Buffer.from(s)

// console.log('buff::', buff)
// console.log('buff.toString()::', buff.toString('hex'))
// console.log('s.toString()::', s.toString())
// console.log('Buffer.from([])::',Buffer.from('6869','hex'))
// console.log('::', '\xff')//ÿ last char of unicode utf8 table
var json = {}
var buffJson = Buffer.from(JSON.stringify(json))
console.log('buffJson::', buffJson)
console.log('JSON.parse(buffJson)::', JSON.parse(buffJson))

var json = { 1: 1 }
var buffJson = Buffer.from(JSON.stringify(json))
console.log('JSON.stringify(buf);::',JSON.stringify(buffJson))
console.log('buffJson::', buffJson)
console.log('JSON.parse(buffJson)::', JSON.parse(buffJson))

console.log('Buffer.from()::', Buffer.from('30', 'hex').toString('utf8'))

const buf1 = Buffer.from('0123');
const buf2 = Buffer.from('0123');


const arr = [buf1, buf2];

console.log(arr.sort(Buffer.compare));
console.log('buf1.compare(buf2)::',buf1.compare(buf2))