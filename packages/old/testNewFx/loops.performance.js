const R = require('ramda')
var createTree = require("functional-red-black-tree")
var bplusTree = require('../bplustree/lib').default
// console.log('bplusTree::', bplusTree)
var t1 = createTree()
let howManyMillions = n => n * 1000000
// let n = howManyMillions(10)
let n = 100000

// const is = Buffer.from('aa') > Buffer.from('b')
// console.log('is::',is)

// const rest = Buffer.from('a')
// console.log('rest::',rest)
// testBPlusTree(n)
testRedTree(n)
// testArrays(n)
// testObject(n)
// testMaps(n)
// testMaps2()
// ArraysVsObjects()
function ArraysVsObjects() {
    var posts = []
    const mockData = (number) => {
        for (let i = 0; i < number; i++) {
            posts.push(i)
        }
    }
    console.time('mockDataArray');
    mockData(n)
    console.timeEnd('mockDataArray');
    console.time('while looop');
    var len = posts.length;
    while (len--) {
        posts[len]++
    }
    console.timeEnd('while looop');

    console.time('reduce array');
    var len = 0
    var tam = posts.length
    while (len <= tam) {
        posts.shift()
        len++
    }
    console.timeEnd('reduce array');



    var count = 0
    var objArray = {}
    const mockDataObj = (number) => {
        for (let i = 0; i < number; i++) {
            objArray[count] = i
            count++

        }
    }
    console.time('mockDataObject');
    mockDataObj(n)
    console.timeEnd('mockDataObject');

    console.time('while Object');
    var len = count;
    while (len--) {
        objArray[len]++
    }
    console.timeEnd('while Object');

    console.time('reduce object');
    var len = 0
    var tam = count
    while (len <= tam) {
        delete objArray[len]
        len++
    }
    console.timeEnd('reduce object');
}
function testBPlusTree(number) {
    const tree = bplusTree({})
    const mockData = (number) => {
        for (let i = 0; i < number; i++) {
            tree.put(i, i)
        }
    }

    console.time('mockDataBplus');
    mockData(n)
    console.timeEnd('mockDataBplus');

    // console.time('foreach');
    // t1.forEach(
    //     (key, value) => {
    //         // console.log('key:', key, ',value:', value)
    //     }
    // )
    // console.timeEnd('foreach');

    // console.time('find');
    // t1.find(10000000)
    // console.timeEnd('find');

    // console.time('insertOne')
    // t1 = t1.insert(99999999999, 'hhhhh')
    // console.timeEnd('insertOne')

    // console.time('insertOne')
    // t1 = t1.insert(444554, 'hhhhh')
    // console.timeEnd('insertOne')
}
function testRedTree(number) {
    const mockData = (number) => {
        for (let i = 0; i < number; i++) {
            t1 = t1.insert(i, i)
        }
    }
    // mockDataTreeBlack: 19556.269ms
    console.time('mockDataTreeBlack');
    mockData(n)
    console.timeEnd('mockDataTreeBlack');

    // console.time('foreach');
    // t1.forEach(
    //     (key, value) => {
    //         // console.log('key:', key, ',value:', value)
    //     }
    // )
    // console.timeEnd('foreach');

    // console.time('find');
    // t1.find(10000000)
    // console.timeEnd('find');

    // console.time('insertOne')
    // t1 = t1.insert(99999999999, 'hhhhh')
    // console.timeEnd('insertOne')

    // console.time('insertOne')
    // t1 = t1.insert(444554, 'hhhhh')
    // console.timeEnd('insertOne')
}
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


    console.time('spliceInit');
    posts.splice(1, 0, 'insertadoo')
    console.timeEnd('spliceInit');


    console.time('spliceFinal');
    posts.splice(10000000 - 1, 0, 'insertadoo')
    console.timeEnd('spliceFinal');


    // console.time('sort1()');
    // posts.sort((a, b) => a - b);
    // console.timeEnd('sort1()');


    // console.time('sort2()');
    // posts.sort((a, b) => a - b);
    // console.timeEnd('sort2()');

    // console.time('posts.find');
    // posts.find(function (element) {
    //     return element === 1000000;
    // });
    // console.timeEnd('posts.find');


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
    console.time('forEach looop');
    posts.forEach(() => { });
    console.timeEnd('forEach looop');

    console.time('while looop');
    var len = posts.length;
    while (len--) {
        // blah blah
    }
    console.timeEnd('while looop');

    console.time('for loop++');
    for (let i = 0; i < posts.length; i++) {
        // sum += posts[i];
    }
    console.timeEnd('for loop++');

    console.time('for2 loop--');
    for (let i = posts.length; i > 0; i--) {
        // sum += posts[i];
    }
    console.timeEnd('for2 loop--');

    console.time('for loop--');
    let i
    for (i = posts.length; i--;) {

    }
    console.timeEnd('for loop--');


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



    console.time('symbol.iterator')
    posts[Symbol.iterator] = function () {
        return {
            // current: this.from,
            // last: this.to,
            next() {
                // if (this.current <= this.last) {
                //     return { done: false, value: this.current++ };
                // } else {
                //     return { done: true };
                // }
            }
        }
    }
    console.timeEnd('symbol.iterator');

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


    console.time(' for (key in posts)')
    let key
    for (key in posts) {
        // alert(key + ' => ' + p[key]);
    }
    console.timeEnd(' for (key in posts)')


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

    console.time('myMap[Symbol.iterator]()');
    const mapIter = map[Symbol.iterator]();
    console.timeEnd('myMap[Symbol.iterator]()');


    //mapIter.next().value

    console.time('mapIterator.next()');
    for (let i of mapIter) {

    }
    console.timeEnd('mapIterator.next()');

    // console.time('mapIterator');
    // for(let i of mapIter){
    //     mapIter.next().value
    // }
    // console.timeEnd('mapIterator');

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

