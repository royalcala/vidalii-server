const types = require('./readInstalled')(__dirname + '/installed')
const init_schema_types = require('./init_schema_types')

module.exports = () => {
    // console.log('types::', types)
    const initialized = init_schema_types({ types })
    // return {
    //     ...readInstalled(__dirname + '/installed')
    // }    
    return initialized
}