const fs = require('fs-extra')
const writeFile = (inputPath, outputPath) => {
    const exampleIndex = fs.readFileSync(inputPath)
    fs.outputFileSync(outputPath, exampleIndex)
}

module.exports = rootPath => {
    //
    writeFile(
        __dirname + "/templates/package.json",
        rootPath + "/package.json"
    )
    //src
    writeFile(
        __dirname + "/templates/src.index.js",
        rootPath + '/src/index.js'
    )
    //src/orm
    // writeFile(
    //     __dirname + "/templates/orm.config.json",
    //     rootPath + '/src/orm/config.json'
    // )
    // writeFile(
    //     __dirname + "/templates/orm.model.js",
    //     rootPath + '/src/orm/models/example.js'
    // )
}