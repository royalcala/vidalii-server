const R = require('ramda')
console.clear()
console.log('start testNewFx')
console.time()
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
                // q: schema_fx,
                b: schema_fx,
                pz: [{
                    za: schema_fx
                }]
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
                b: 1,
                pz: [{
                    za: 1
                }]
            }
        ]
    }
}


const fxValuator = (fx, value) => {
    return fx(value)
}

const ifNoTExistInObj1 = [({ valueNextObj1 }) => R.isNil(valueNextObj1), ({ acc }) => acc]

const ifExistInObj1 =
    ({ acc, valueNextObj1, nameNextObj2, valueNextObj2 }) => ({
        ...acc,
        [nameNextObj2]: R.cond([
            [R.is(Function), () => fxValuator(valueNextObj1, valueNextObj2)],
            [R.is(Array), () => {
                return [recursive({
                    obj1: valueNextObj1[0],
                    obj2: valueNextObj2[0]
                })]
            }],
            [R.is(Object), () => {
                return recursive({
                    obj1: valueNextObj1,
                    obj2: valueNextObj2
                })
            }]
        ])(valueNextObj1)
    })

const recursive = ({ obj1, obj2 }) => {
    let listObj2 = R.toPairs(obj2)

    return R.reduce(
        (acc, [nameNextObj2, valueNextObj2]) => {
            let valueNextObj1 = obj1[nameNextObj2]
            console.log('valueNextObj1::', nameNextObj2, ':', valueNextObj1)
            return R.cond([
                ifNoTExistInObj1,
                [R.T, ifExistInObj1]
            ])({
                acc,
                valueNextObj1,
                nameNextObj2,
                valueNextObj2
            })
        },
        {},
        listObj2)
}

function start(schema, newDoc) {
    const result = recursive({
        obj1: schema,
        obj2: newDoc
    })
    return R.pipe(R.mergeAll)(result)
}

var result = start(schema, newDoc)

console.log(
    'result::',
    result
)


