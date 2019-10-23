console.log('in vidaliiDb->db')
const fxs = require('./readInstalled')(__dirname + '/installedFXS')
const evol = require('./evol')
// console.log(fxs)
// var level = fxs.dbTypes({ nameType: 'level' })()
// db = level('./data/test2', { valueEncoding: 'json' })
console.log(
    'evol::',
    evol(
        fxs.inputParams({
            dir: __dirname + '/data',
            name: 'test1'
        }),
        [
            fxs.dbSelectType('level', opt = { valueEncoding: 'json' }),
            'dbSelectType'
        ]
    )
)
// // 2) Put a key & value
// db.put('name', [{ a: 1 }], function (err) {
//     if (err) return console.log('Ooops!', err) // some kind of I/O error

//     // 3) Fetch by key
//     db.get('name', function (err, value) {
//         if (err) return console.log('Ooops!', err) // likely the key was not found

//         // Ta da!
//         console.log('name1=' + value[0].a)
//         // console.log('name:', JSON.parse(value.toString()))
//     })
// })

// db.get('name', function (err, value) {
//     if (err) return console.log('Ooops!', err) // likely the key was not found

//     // Ta da!
//     console.log('name=' + value[0].a)
// })

