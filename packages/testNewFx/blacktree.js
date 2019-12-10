console.clear()
console.log('in testNewFx/blacktree.js')
var createTree = require("functional-red-black-tree")
var level = require('level-mem')

// levelfx()
maps()




function maps() {
    var miMapa = new Map();
    const obj1 = {
        a: { b: 1 }
    }

    miMapa.set('key1', obj1.a);
    const obj2 = {
        a: { b: miMapa.get('key1') }
    }
    console.log('obj2::', obj2)
    console.log('miMapa.get()::', miMapa.get('key1'))
    obj1.a.b = 22
    console.log('miMapa.get()::', miMapa.get('key1'))
    console.log('obj2::', obj2)

    miMapa.set('key2', 'im key2');
    const obj3 = {
        a: miMapa.get('key2')
    }
    console.log('obj3::', obj3)
    miMapa.set('key2', 'changed')
    console.log('obj3::', obj3)
}

function blacktree() {

    //Load the library
    //Create a tree
    var tree = createTree()
    console.log('tree::', tree)

    const obj1 = {
        a: { b: 1 }
    }
    tree = tree.insert(3, obj1.a)
    tree = tree.insert(2, "value 2")
    tree = tree.insert(1, "valu 1")

    console.log('tree.end::', tree.end)
    // tree.forEach(
    //     (key, value) => {
    //         console.log('lastValue',key, '::', value)
    //     }
    //     ,66
    // )

    // // 
    // // tree = tree.insert('a', "bar")
    // console.log('tree.length:', tree.length)
    // console.log('tree.root::',tree.root)

    // console.log('tree.keys::',tree.keys)
    console.log('tree.values::', tree.values)
    obj1.a.b = 22
    console.log('tree.values::', tree.values)
    // console.log('tree.get(4)::',tree.get(4))
    // console.log('tree.finId(key)::',tree.find(10))
    // console.log('tree.ge(8)::',tree.ge(8))

    // console.log('tree.ge(8).keys::',tree.ge(1).hasNext)
    // console.log('tree.ge(8).keys::',tree.gt(1).index)
    // console.log('/*/*///*/:',
    // tree.gt(50)
    // )

    // tree.forEach(
    //     (key, value) => {
    //         console.log('lastValue',key, '::', value)
    //     }
    //     ,tree.gt(51).index, tree.gt(51).index
    // )
    // var a = tree.ge(4)
    // console.log('a::',a.next())
    // console.log(tree)


    // console.log('tree::',tree)
    // //Remove something
    // var t4 = t3.remove(1)
    // console.log('t3:',t3)


}

function levelfx() {
    const db = level()
    const obj1 = {
        a: { b: 1 }
    }
    // 2) Put a key & value
    db.put('name', obj1, function (err) {
        if (err) return console.log('Ooops!', err) // some kind of I/O error
        obj1.a.b = 2222
        // 3) Fetch by key
        db.get('name', function (err, value) {
            if (err) return console.log('Ooops!', err) // likely the key was not found

            // Ta da!
            console.log('name=' + value)
        })
    })
}
function comparedwithArray() {
    var mil = 1000
    var nmillon = (n) => 1000 * 1000 * n

    console.time('init array')
    var arre = []
    for (var i = nmillon(1); i > 0; i--) {
        // console.log(i)
        var value = Math.floor(Math.random() * 1000)
        arre.push([value, value])
    }
    console.timeEnd('init array')

    console.time('tree')
    arre.forEach(e => {
        tree = tree.insert(e[0], e[1])
    });
    console.timeEnd('tree')

    console.time('sort')
    arre.sort(function (a, b) {
        return a - b;
    });
    console.timeEnd('sort')
    console.log('tree.length::', tree.length)
}

