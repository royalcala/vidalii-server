const fs = require('fs-extra')
// fs.ensureDirSync //create only if not exit
const rootAppDir = fs.realpathSync('./') //root dir of the app

const createGql = () => {
    const dir = rootAppDir + '/src/gql/'
    fs.ensureDirSync(dir + 'directives')
    fs.ensureDirSync(dir + 'scalars')
    fs.ensureDirSync(dir + 'sdls')
    fs.ensureDirSync(dir + 'types')
    fs.ensureDirSync(dir + 'queries')
    fs.ensureDirSync(dir + 'mutations')
}
const createOrm = () => {
    const dir = rootAppDir + '/src/orm/'
    fs.ensureDirSync(dir + 'migration')
    fs.ensureDirSync(dir + 'subscriber')
    //templates Files
    const exampleConfigDB = require("./template.config")
    const exampleModel = require("./template.model")
    fs.outputJsonSync(dir + 'config.json', exampleConfigDB)
    fs.outputFileSync(dir + 'models/example.js', exampleModel)
}
const createIndex = ()=>{

}
const updatePackageJson = () => {
    const pathFile = rootAppDir + 'package.json'
    let packageJson = require(pathFile)
    packageJson.scripts = {
        ...packageJson.scripts,
        "vidalii:dev": "babel-node --ignore=' ' -r dotenv/config src"
    }
    fs.outputJsonSync(pathFile, packageJson)
}

module.exports = {
    createGql,
    createOrm,
    updatePackageJson
}