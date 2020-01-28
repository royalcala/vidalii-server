const fs = require('fs-extra')
module.exports.removeDataBase = ({ location }) => {
    fs.removeSync(location)
    var existDir = fs.existsSync(location)
    if (existDir)
        console.log(`Removed error in ${location}`)
    else
        console.log(`The path of ${location} was removed`)
}