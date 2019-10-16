const readInstalled = require('./readInstalled')
module.exports = {
    ...readInstalled(__dirname + '/installed')
}
