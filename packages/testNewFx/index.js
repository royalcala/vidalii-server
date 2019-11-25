console.clear()
console.log('::in testNewFx')
var store = 'store1'
const obj1 = {
    put: () => {
        return store
    },
    del: 2
}

const fx = (obj1) => {

    return {
        ...obj1,
        get: 3
    }
}

const instance = fx(obj1)

instance.put = 0
console.log('obj1::', obj1)
console.log('instance::', instance)