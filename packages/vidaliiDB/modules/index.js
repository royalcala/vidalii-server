const fs = require('fs')
const R = require('ramda')
// const readModules = require('./readModules')
// const readComponets = require('./readComponents')


// const readInputs = require('./readInputs')
const readNodes = require('./readInstalled')
// const processLayer = require('./processLayer')

const configFxs = require('./fxs.json')
const vidaliiPipe = require('./vidaliiPipe')
module.exports = ({ pathToInputs }) => {
    // console.log('pipe::', pipe)    
    // const inputData = readInputs({
    //     pathToInputs
    // })
    // console.log('inputData::', inputData)

    // const nodesTypesComponents = readNodes({
    //     pathToNodes: __dirname + '/installedTypesComponents'
    // })
    console.log('pathToInputs:::',pathToInputs)
    const fxs = readNodes({
        pathToNodes: __dirname + '/installedFxs'
    })
    console.log('fxs:::',fxs)
    const result = vidaliiPipe({
        configFxs,
        fxs
    })
    // console.log('result:::', result)


    return result({
        pathToInputs
    })
}