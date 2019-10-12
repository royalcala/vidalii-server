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
    const fxs = readNodes({
        pathToNodes: __dirname + '/installedFxs'
    })    
    const result = vidaliiPipe({
        configFxs,
        fxs
    })

    return result({
        pathToInputs
    })
}