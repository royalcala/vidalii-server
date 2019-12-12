console.clear()
console.log('testing intenalDB')
//database manager object dmo
const dmo = require('./readInstalled')({
    pathToNodes: __dirname + '/installedDMO'
})
console.log(dmo)

module.exports = () => {

    return dmo
}