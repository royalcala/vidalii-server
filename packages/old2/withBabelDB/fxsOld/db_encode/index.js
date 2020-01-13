import rev from './fxs/rev'
import docs from './fxs/docsDefault'
import seq from './fxs/seq'
// var levelup = require('levelup')

export default ({ config, db }) => {

    return {
        docs: docs({ db }),
        rev: rev({ db }),
        seq: seq({ db, config })
    }
}