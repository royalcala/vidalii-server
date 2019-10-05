const fs = require('fs')
const R = require('ramda')
const readModules = require('./readModules')
const readComponets = require('./readComponents')


const readInputs = require('./readInputs')
const readNodes = require('./readNodes')
const processLayer = require('./processLayer')

const pipe = require('./pipe.json')
const vidaliiPipe = require('./vidaliiPipe')
module.exports = ({ pathToInputs }) => {

    // console.log('pipe::', pipe)

    const inputData = readInputs({
        pathToInputs
    })
    // console.log('inputData::', inputData)

    const nodesTypesComponents = readNodes({
        pathToNodes: __dirname + '/installedTypesComponents'
    })
    // console.log('nodesTypesComponents::', nodesTypesComponents)


    const result = vidaliiPipe({
        pipe,
        fxs: readNodes({
            pathToNodes: __dirname + '/installedFxs'
        })
    })

    result({
        pathToInputs
    })
    // console.log(
    //     'result vidaliiPipe::',
    //     result({
    //         pathToInputs
    //     })
    //     )
    // const firstLayer = processLayer({
    //     inputData,
    //     // pathToLayer: __dirname + '/installedTypesComponents'
    //     nodes: nodesTypesComponents
    // })
    // console.log('firstLayer::', firstLayer)

    // const modules = readModules({ pathToInputs, readComponets })
    // return modules
    return ''
}