const R = require('ramda')
const fs = require('fs')
const types = require('./valuesTypes')

const composeSchemas = schemas => R.pipe(
    R.dissoc('main'),
    R.toPairs,
    R.reduce(
        (acc, [nameSchema, valueSchema]) =>
            R.assocPath(
                R.split('.', nameSchema),
                valueSchema,
                acc
            ),
        { ...schemas.main })
)(schemas)

const readSchemas = pathToRead => R.pipe(
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
    const schema = R.pipe(
        readSchemas,
        composeSchemas
    )(pathToComponent)

    return schema
}