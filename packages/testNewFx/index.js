console.clear()
console.log('on testing fx')

var newDoc = 1
var schema = {
    a: (fx, val) => fx(val)
}

function hola(a) {
    // console.log(this)
    return a + 10
}


function validate(schema, newDoc, hola) {
    return schema.a(hola, newDoc)
}
const main2 = ({ main }, val) => {

    return val
}

const main = (a) => {
    console.log(this)
    return a
}

console.log(
    'main',
    hola('hola')
)