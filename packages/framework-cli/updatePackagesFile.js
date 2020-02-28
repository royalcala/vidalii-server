const fs = require('fs-extra')
// fs.ensureDirSync //create only if not exit
const rootAppDir = fs.realpathSync('./') //root dir of the app

module.exports.update = () => {
    const pathFile = rootAppDir + '/package.json'
    let packageJson = require(pathFile)
    packageJson.scripts = {
        ...packageJson.scripts,
        "vidalii:dev": "babel-node --ignore=' ' --require dotenv/config src"
    }
    fs.outputJsonSync(pathFile, packageJson)
}
