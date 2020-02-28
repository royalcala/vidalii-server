const fs = require('fs-extra')
const rootAppDir = fs.realpathSync('./') //root dir of the app
module.exports.createIndex = () => {
    const dir = rootAppDir + '/src/'
    const exampleIndex = fs.readFileSync(__dirname + "/templates/src.index.js")
    fs.outputFileSync(dir + 'index.js', exampleIndex)
}

module.exports.createOrm = () => {
    const dir = rootAppDir + '/src/orm/'
    const exampleConfigDB = fs.readFileSync(__dirname + "/templates/orm.config.json")
    fs.outputFileSync(dir + 'config.json', exampleConfigDB)
    const exampleModel = fs.readFileSync(__dirname + "/templates/orm.model.js")
    fs.outputFileSync(dir + 'models/example.js', exampleModel)
    //  const exampleConfigDB = require("./template.config")
    //  const exampleModel = require("./template.model")
    //  fs.outputJsonSync(dir + 'config.json', exampleConfigDB)
    //  fs.outputFileSync(dir + 'models/example.js', exampleModel)

}