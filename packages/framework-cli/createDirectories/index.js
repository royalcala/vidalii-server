const fs = require('fs-extra')
// fs.ensureDirSync //create only if not exit
const rootAppDir = fs.realpathSync('./') + '/src' //root dir of the app

const createGql = () => {
    fs.ensureDirSync(rootAppDir + '/gql/directives')
    fs.ensureDirSync(rootAppDir + '/gql/scalars')
    fs.ensureDirSync(rootAppDir + '/gql/sdls')
    fs.ensureDirSync(rootAppDir + '/gql/types')
    fs.ensureDirSync(rootAppDir + '/gql/queries')
    fs.ensureDirSync(rootAppDir + '/gql/mutations')
}
const createOrm = () => {
    fs.ensureDirSync(rootAppDir + '/orm/models')
    fs.ensureDirSync(rootAppDir + '/orm/migration')
    fs.ensureDirSync(rootAppDir + '/orm/subscriber')
    const config = {
        "name": "default",
        "type": "sqlite",
        "database": "databases/local.sqlite",
        "synchronize": true,
        "logging": false,
        "entities": [
            "src/orm/models/*.js"
        ],
        "migrations": [
            "src/orm/migration/*.js"
        ],
        "subscribers": [
            "src/orm/subscriber/*.js"
        ]
    }
    fs.outputJsonSync(rootAppDir + '/orm/config.json', config)
}

module.exports = {
    createGql,
    createOrm
}