const R = require('ramda')
const libraries = require('./readInstalled')(__dirname + '/installed')
const initialized_schema_types = require('./init_schema_types')

module.exports = () => {
    // console.log(
    //     initialized_schema_types(libraries)
    // )
    const result = R.pipe(
        initialized_schema_types
    )(libraries)

    // console.log()
    return result
}