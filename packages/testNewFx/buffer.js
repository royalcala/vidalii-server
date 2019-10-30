console.clear()
console.log('clean console.in buffer.js')
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

console.log(json);
// Prints: {"type":"Buffer","data":[1,2,3,4,5]}

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
});

console.log(copy);

var b1 = Buffer.alloc(20);

var b2 = Buffer.from('Mañana más');

console.log('Este es mi buffer inicializado a cero');
console.log(b1);
console.log('----------------------------------------');
console.log('Este es mi buffer creado con un string');
console.log(b2);

var buf2 = Buffer.from('abc', 'binary');

console.log(buf2);
var arr = [Buffer('1'), Buffer('2'), Buffer('10')];
console.log(
    arr.sort()
)


var arr2 = [1, 2, 3, 10]

console.log(arr2.sort())
console.log(
    new Date()
)