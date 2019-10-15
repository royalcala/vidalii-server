const libraries = require('./readInstalled')(__dirname + '/installed')

module.exports = () => {
    // console.log('validationFxs::',validationFxs)
    // return libraries
    
    return libraries
}