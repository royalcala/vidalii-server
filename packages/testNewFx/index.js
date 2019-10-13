const R = require('ramda')
console.clear()
console.log('start testNewFx')
const schema_fx = x => x + 10

const schema = {
    a: {
        w: schema_fx,
        y: {
            n: schema_fx
        }
    },
    b: schema_fx,
    c: {
        p: [
            {
                q: schema_fx,
                b: schema_fx,
                pz: {
                    za: schema_fx
                }
            }
        ]
    }
}

const newDoc = {
    a: {
        w: 1,
        y: {
            n: 1
        }
    },
    b: 1,
    c: {
        p: [
            {
                q: 1,
                b: 1
            }
        ]
    }
}

const nextNewDocNodeArray = ({ key, newDocNode }) => {
    try {
        let node = newDocNode[key][0]
        console.log(key, '=>node::', node)

        return R.ifElse(
            R.has(key),
            R.prop(key),
            () => ({ _noExist: true })
        )(node)
    } catch (error) {
        console.log('ERRRRRRRRRRRRROR')
        return () => ({ _noExist: true })
    }

}

const nextNewDocNodeObject = ({ key, newDocNode }) => R.ifElse(
    R.has(key),
    R.prop(key),
    () => ({ _noExist: true })
)(newDocNode)

const recursive = (newDocNode) => (listNodes) => {
    return R.reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: R.cond([
                [R.is(Function), () => 2],
                [R.is(Array), () => {
                    // console.log('array value::', value)
                    console.log('after=>newDocNode::', newDocNode[key][0])
                    // let n = nextNewDocNodeObject({ key, newDocNode: newDocNode[key][0] })
                    let n
                    if (newDocNode[key][0]) {
                        console.log('exist array')
                        n=newDocNode[key][0]
                    } else {
                        console.log('not exist')
                        n={ _noExist: true }
                    }
                    console.log(
                        'array ',
                        'schemaNode:', value[0],
                        '===',
                        'docNode:',
                        n
                    )
                    let result = recursive(
                        n
                    )(R.toPairs(value[0]))
                    //    console.log('resultArray::',result)
                    // return 'isArray'
                    return [result]
                }],
                [R.is(Object), () => {
                    let n = nextNewDocNodeObject({ key, newDocNode })
                    console.log(
                        'object ',
                        'schemaNode:', value,
                        '===',
                        'docNode:',
                        n
                    )
                    return recursive(n)(R.toPairs(value))
                }]
            ])(value)
        }),
        {},
        listNodes)
}
// R.reduce(R.subtract, 0, [1, 2, 3, 4])


function start(schema, newDoc) {
    return R.pipe(
        R.toPairs,
        recursive(newDoc),
        R.mergeAll
    )(schema)
}

var result = start(schema, newDoc)

console.log(
    'result::',
    result
)




const a = {
    b: 1
}
// try {
//     const test = a.c
// } catch (error) {
//     // const test = 'undefined'
// }
// const test = R.tryCatch(R.has('x'), ()=>'no')('a')

// console.log('test', test)

