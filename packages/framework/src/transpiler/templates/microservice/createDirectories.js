const fs = require('fs-extra')
// fs.ensureDirSync //create only if not exit

module.exports = rootPath => {
    //gql
    fs.ensureDirSync(rootPath + '/src/gql/directives')
    fs.ensureDirSync(rootPath + '/src/gql/scalars')
    fs.ensureDirSync(rootPath + '/src/gql/sdls')
    // fs.ensureDirSync(rootPath + '/src/gql/types')
    // fs.ensureDirSync(rootPath + '/src/gql/queries')
    // fs.ensureDirSync(rootPath + '/src/gql/mutations')

    //orm    
    fs.ensureDirSync(rootPath + '/src/orm/schemas')
    fs.ensureDirSync(rootPath + '/src/orm/models')
    fs.ensureDirSync(rootPath + '/src/orm/migration')
    fs.ensureDirSync(rootPath + '/src/orm/subscriber')
}

