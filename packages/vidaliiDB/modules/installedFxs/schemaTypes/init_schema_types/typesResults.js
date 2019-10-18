const R = require('ramda')
const isNodeType = {
    isNodeType: true
}

const isFx = [
    x => R.type(x) === 'Function',
    fx => (...y) => ({
        ...fx(...y),
        ...isNodeType
    })
]

const isObject = [
    x => R.type(x) === 'Object',
    o => ({
        ...o,
        ...isNodeType
    })
]

module.exports = {
    isFx,
    isObject
}