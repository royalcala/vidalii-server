// const { ID, rev, string, json, enums } = require('@vidalii/db/schemas/valuesTypes')
const R = require('ramda')
const fs = require('fs')
const types = require('../../schemas/valuesTypes')

const readSchemas = (pathToRead) => R.pipe(
    fs.readdirSync,
    R.map(x => {
        let nameFile = R.replace('.js', '', x)
        return {
            [nameFile]: require(pathToRead + '/' + x)({ types })
        }
    }),
    R.mergeAll
)(pathToRead)

module.exports = ({ pathToComponent }) => {
    //read each schema, 
    //or read one if its merged already
    const schemaParts = readSchemas(pathToComponent)
    return schemaParts

}