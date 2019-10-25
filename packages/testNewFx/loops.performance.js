const R = require('ramda')
let n = 10000000
// testArrays(n)
// testObject(n)
// testMaps(n)
testMaps2()
function testArrays(n) {
    var posts = []
    // var oData = {}
    const mockData = (number) => {

        for (let i = 0; i < number; i++) {
            posts.push([i, i])
            // oData[i] = data[i]
        }
        // return data
    }


    console.time('mockDataArray');
    mockData(n)
    console.timeEnd('mockDataArray');
    console.time('posts.length');
    posts.length
    console.timeEnd('posts.length');

    console.time('posts.find');
    posts.find(function (element) {
        return element === 1000000;
    });
    console.timeEnd('posts.find');


    console.time('indexOf()');
    posts.indexOf(1000000)
    console.timeEnd('indexOf()');

    let sum = 0;

    // sum = 0;
    // console.time('link_oData');
    // posts.reduce((acc, v) => {
    //     // oData[v]
    // }, 0);
    // console.timeEnd('link_oData')

    //win <-----------
    console.time('for loop');
    for (let i = 0; i < posts.length; i++) {
        // sum += posts[i];
    }
    console.timeEnd('for loop');


    console.time('reduce');
    posts.reduce((s, p) => {

    }, 0);
    console.timeEnd('reduce')

    //second <--------
    console.time('R.reduce');
    R.reduce(
        () => {
            // return [
            //     ...acc,
            //     v
            // ]
        }
        , 0
    )(posts)
    console.timeEnd('R.reduce');


    console.time('R.map');
    R.map(
        () => { }
    )(posts)
    console.timeEnd('R.map');


    console.time('map');
    posts.map(() => {

    });
    console.timeEnd('map')


    console.time('for each');
    posts.forEach(() => {

    });
    console.timeEnd('for each');

}

function testObject() {
    var posts = {}
    const mockData = (number) => {
        let data = {}
        for (let i = 0; i < number; i++) {
            posts[i] = i
        }
        return data
    }
    console.time('mockDataObject');
    mockData(n)
    console.timeEnd('mockDataObject');


    console.time('Object.keys(user)');
    Object.keys(posts)
    console.timeEnd('Object.keys(user)');


    console.time('Object.values(user)');
    Object.values(posts)
    console.timeEnd('Object.values(user)');

    console.time('R.toPairs');
    R.toPairs(posts)
    console.timeEnd('R.toPairs');

    console.time('Object.entries()');
    Object.entries(posts)
    console.timeEnd('Object.entries()');

    // console.time('Object.fromEntries()');
    // Object.fromEntries(posts)
    // console.timeEnd('Object.fromEntries()');


    var sum = 0;
    console.time('toPairs_R.reduce');
    sum = R.pipe(
        R.toPairs,
        R.reduce(
            (acc, v) => { }
            , 0
        )
    )(posts)
    console.timeEnd('toPairs_R.reduce');


    console.time('R.forEachObjIndexed');
    // const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
    R.forEachObjIndexed((value, key) => { }, posts);
    console.timeEnd('R.forEachObjIndexed');



    console.time('R.mapObjIndexed');
    // const xyz = { x: 1, y: 2, z: 3 };
    // const prependKeyAndDouble = (num, key, obj) => key + (num * 2);

    //win<---------
    R.mapObjIndexed((num, key, obj) => { }, posts)
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


function testMaps(n) {
    var map = new Map();
    const mockData = (number) => {

        for (let i = 0; i < number; i++) {
            map.set(i, i)
        }

    }
    console.time('mockDataMap_type1');
    mockData(n)
    console.timeEnd('mockDataMap_type1');
    //error
    // var arrays = []
    // const mockData2 = (number) => {

    //     for (let i = 0; i < number; i++) {
    //         arrays.push([i,i])
    //     }

    // }
    // console.time('mockDataMap_type2');
    // mockData2(n)
    // var map2 = new Map(arrays)
    // console.timeEnd('mockDataMap_type2');

    console.time('map.size');
    map.size
    console.timeEnd('map.size');

    console.time('map.has(key)');
    map.has(1000000)
    console.timeEnd('map.has(key)');

    console.time('map.get(key)');
    map.get(1000001)
    console.timeEnd('map.get(key)');

    console.time('map.keys()');
    // iterate over keys (vegetables)
    for (let vegetable of map.keys()) {
        // alert(vegetable); // cucumber, tomatoes, onion
    }
    console.timeEnd('map.keys()');

    console.time('map.values()');
    // iterate over values (amounts)
    for (let amount of map.values()) {
        // alert(amount); // 500, 350, 50
    }
    console.timeEnd('map.values()');

    console.time('map.values and keys()');
    // iterate over [key, value] entries
    for (let entry of map) { // the same as of recipeMap.entries()
        // alert(entry); // cucumber,500 (and so on)
    }
    console.timeEnd('map.values and keys()');

    console.time('map.forEach');
    map.forEach((value, key, map) => {

    });
    console.timeEnd('map.forEach');

    console.time('map.entries()');
    for (var [key, value] of map.entries()) {

    }
    console.timeEnd('map.entries()');

    console.time('Array.from(myMap)');
    Array.from(map)
    console.timeEnd('Array.from(myMap)');

    console.time('[...map]');
    [...map]
    console.timeEnd('[...map]');



}

function testMaps2() {
    // var tables = {
    // compras: new Map([
    //     [1, { data: 'here1' }],
    //     [2, { data: 'here2' }]
    // ]),
    // proveedores: new Map([
    //     [1, { data: 'prov_here1' }],
    //     [2, { data: 'prov_here2' }]
    // ]),
    // materiales: new Map([
    //     [1, { data: 'mat_here1' }],
    //     [2, { data: 'mat_here2' }]
    // ]),
    // }
    var array = ['No', 'objTest: NO']
    var array2 = array
    var pedazoArray = array[0]


    array2[0] = 'yes'
    console.log(
        'array con array hacer referencia?',
        array
    )

    console.log(
        'pedazoArray hacer referencia?.',
        pedazoArray
    )

    console.log('++++++OBJECTS++++++++')
    var obj = { a: 'NO', b: { a: 'NO' }, forArray: { a: 'NO' } }
    var obj2 = obj
    var pedazoObj = obj.b
    obj2.a = 'yes'
    obj2.b.a = 'yes'
    console.log(
        'obj con obj hacer referencia?',
        obj.a
    )

    console.log(
        'pedazoObj hacer referencia si apunta a obj?.',
        pedazoObj
    )

    ///object y arrays 

    array[2] = obj.forArray
    array[2].a = 'yes'
    console.log(
        'arrayToObj hace reference:',
        obj.forArray
    )
    //mapas
    console.log('+++++++++maps++++++++++++')
    var map = new Map([
        [1, 'NO'],
        ['padazo', 'NO'],
        ['forRefArray', 'NO']
    ])
    var map3 = map[0]
    console.log('map3', map3)
    console.log('map', map)
    var map2 = new Map()
    map2 = map
    map2.set(1, 'Yes')
    console.log(
        'map con map hacer referencia?',
        map.get(1)
    )

    var pedazoMapConMap = new Map([
        ['map', map],
        [2, 'test']
    ])
    pedazoMapConMap.get('map').set('pedazo', 'Yes')
    console.log(
        'un map agregado a otro map?',
        map.get('pedazo')
    )
    var pedazoMapConMap2 = new Map([
        ['map', () => map],
        [2, 'test']
    ])
    pedazoMapConMap2.get('map')().set('pedazo', 'no again')
    console.log(
        map.get('pedazo')
    )

}
