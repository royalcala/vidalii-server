console.log('in vidaliiDb->db')
const R = require('ramda')
const fxs = require('./readInstalled')(__dirname + '/installedFXS')
const evol = require('./evol')
// console.log(fxs)
// var level = fxs.dbTypes({ nameType: 'level' })()
// db = level('./data/test2', { valueEncoding: 'json' })
const uuidv4 = require('uuid/v4')

fxsToProcess = [
    [
        'input',
        () => ({
            db: {
                dir: __dirname + '/data',
                name: 'test3'
            }
        }),

    ],
    [
        'db',
        fxs.dbSelectType('level', { valueEncoding: 'json' }),
    ],
    [
        'indexesInMemory',
        ({ db, input }) => new Promise((resolve, reject) => {
            var databaseInMemory = []
            var defaultIndex = {
                _id: {}
            }
            db.createReadStream()
                .on('data', function (data) {
                    console.log('Buffers:', 'key:', data.key, 'value:', data.value)
                    data.value._id = data.key
                    defaultIndex._id = databaseInMemory.push(data.value)
                })
                .on('error', function (err) {
                    console.log('Oh my!', err)
                })
                .on('close', function () {
                    console.log('Stream closed')
                })
                .on('end', function () {
                    console.log('Stream ended')
                    // resolve(store)
                })
        })
    ],
    [
        'test_indexes',
        async ({ indexesInMemory }) => {
            let a = await indexesInMemory
            console.log('indexes::', a)
        }
    ],
    [
        'checkPointers',
        ({ input }) => {
            // console.log(input)
        }
    ],
    [
        'build_response',
        () => ({
            error = null,
            ...data
        }) => {
            //error:{msg}
            return {
                data,
                ...(error === null ? {} : { ...error })
            }
        }
    ],
    [
        'addCRUD',
        ({ db, build_response }) => ({
            insertOne: async ({ _id = uuidv4(), ...data }) => {

                let response = null
                try {
                    //always remplas the id 
                    response = await db.put(_id, data)
                    return build_response({ _id })
                } catch (error) {
                    return build_response({
                        error: {
                            msg: 'error on put'
                        }
                    })
                }

            }
        })
    ],
    [
        'test_addCRUD',
        async ({ addCRUD }) => {
            // console.log('addCRUD::', addCRUD)
            var result = await addCRUD.insertOne({
                _id: 'hola',
                msg: 'first insert'
            })
            // console.log('result:', result)
        }
    ]
]

// evol(...fxsToProcess)

// console.log(
//     'evol::',
//     evol(...fxsToProcess)
// )
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


// var docs = [
//     { _id: 1, _idProv: 'p1', data2: 'd2' },
//     { _id: 2, _idProv: 'p1', data2: 'd2' },
// ]
// var indexes = {
//     _id: {}
// }
// console.log('indexes::', indexes)
// var index = docs.push({ _id: 3, _idProv: 'p2', data2: 'd2' })
// indexes._id = docs[index - 1]
// console.log('indexes::', indexes._id)
// indexes._id._delete = 'borrado'
// console.log('indexes::', indexes._id)
// console.log('docs:', docs)

function testArrays(n) {
    var data = []
    var oData = {}
    const mockData = (number) => {
       
        for (let i = 0; i < number; i++) {
            data.push(i)
            oData[i] = data[i]
        }
        return data
    }


    console.time('mockDataArray');
    var posts = mockData(n)
    console.timeEnd('mockDataArray');
    let sum = 0;

    sum = 0;
    console.time('link_oData');
    sum = posts.reduce((acc, v) =>{
        oData[v]
    }, 0);
    console.timeEnd('link_oData')
    //win <-----------
    console.time('for loop');
    for (let i = 0; i < posts.length; i++) {
        // sum += posts[i];
    }
    console.timeEnd('for loop');

    sum = 0;
    console.time('reduce');
    sum = posts.reduce((s, p) =>{

    }, 0);
    console.timeEnd('reduce')

    //second <--------
    sum = 0;
    console.time('R.reduce');
    var init = []
    sum = R.reduce(
        (acc, v) => {
            // return [
            //     ...acc,
            //     v
            // ]
        }
        , []
    )(posts)
    console.timeEnd('R.reduce');

    // sum = 0;
    // console.time('R.map');
    // R.map(
    //     (n) => sum += n
    // )(posts)
    // console.timeEnd('R.map');

    sum = 0;
    console.time('map');
    posts.map((s) => {

    });
    console.timeEnd('map')

    // sum = 0;
    // console.time('for each');
    // posts.forEach(element => {
    //     sum += element;
    // });
    // console.timeEnd('for each');

}
let n = 10000000
testArrays(n)

function testObject() {
    const mockData = (number) => {
        let data = {}
        for (let i = 0; i < number; i++) {
            data[i] = i
        }
        return data
    }
    console.time('mockDataObject');
    var posts = mockData(n)
    console.timeEnd('mockDataObject');

    var sum = 0;
    // console.time('toPairs_R.reduce');
    // sum = R.pipe(
    //     R.toPairs,
    //     R.reduce(
    //         (acc, v) => (acc + v)
    //         , 0
    //     )
    // )(posts)
    // console.timeEnd('toPairs_R.reduce');

    sum = 0;
    console.time('R.forEachObjIndexed');
    // const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
    R.forEachObjIndexed((value, key) => sum += value, posts);
    console.timeEnd('R.forEachObjIndexed');


    sum = 0;
    console.time('R.mapObjIndexed');
    // const xyz = { x: 1, y: 2, z: 3 };
    // const prependKeyAndDouble = (num, key, obj) => key + (num * 2);

    //win<---------
    R.mapObjIndexed((num, key, obj) => sum += num, posts)
    console.timeEnd('R.mapObjIndexed');

    console.time('Object.entries(myObj).forEach');
    Object.entries(posts).forEach(([key, val]) => {
        // console.log(key); // the name of the current key.
        // console.log(val); // the value of the current key.
    });
    console.timeEnd('Object.entries(myObj).forEach');
    console.time(' for (key in posts)')
    let key
    for (key in posts) {
        // alert(key + ' => ' + p[key]);
    }
    console.timeEnd(' for (key in posts)')
}
// testObject(n)

// const posts = [
//     { id: 1, upVotes: 2 },
//     { id: 2, upVotes: 18 },
//     { id: 3, upVotes: 1 },
//     { id: 4, upVotes: 30 },
//     { id: 5, upVotes: 50 }
// ];


// let sum = 0;
// console.time('reduce');
// sum = posts.reduce((s, p) => s += p.upVotes, 0);
// console.timeEnd('reduce')
// sum = 0;
// console.time('for loop');
// for (let i = 0; i < posts.length; i++) {
//     sum += posts[i].upVotes;
// }
// console.timeEnd('for loop');
// sum = 0;
// console.time('for each');
// posts.forEach(element => {
//     sum += element.upVotes;
// });
// console.timeEnd('for each');