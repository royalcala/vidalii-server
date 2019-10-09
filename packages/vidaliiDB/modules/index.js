const fs = require('fs')
const R = require('ramda')
// const readModules = require('./readModules')
// const readComponets = require('./readComponents')


const readInputs = require('./readInputs')
const readNodes = require('./readNodes')
// const processLayer = require('./processLayer')

const configPipe = require('./pipe.json')
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

    const result = vidaliiPipe({
        configPipe,
        fxs: readNodes({
            pathToNodes: __dirname + '/installedFxs'
        })
    })

  

    return result({
        pathToInputs
    })
}