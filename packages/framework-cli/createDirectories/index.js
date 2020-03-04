const fs = require('fs-extra')
// fs.ensureDirSync //create only if not exit
const rootAppDir = fs.realpathSync('./') //root dir of the app

module.exports.createGql = () => {
    const dir = rootAppDir + '/src/gql/'
    fs.ensureDirSync(dir + 'directives')
    fs.ensureDirSync(dir + 'scalars')
    fs.ensureDirSync(dir + 'sdls')
    fs.ensureDirSync(dir + 'types')
    fs.ensureDirSync(dir + 'queries')
    fs.ensureDirSync(dir + 'mutations')
}
module.exports.createOrm = () => {
    const dir = rootAppDir + '/src/orm/'
    fs.ensureDirSync(dir + 'schemas')
    fs.ensureDirSync(dir + 'models')
    fs.ensureDirSync(dir + 'migration')
    fs.ensureDirSync(dir + 'subscriber')
}

