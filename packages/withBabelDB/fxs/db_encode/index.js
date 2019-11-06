import rev from './fxs/rev'
import docs from './fxs/docs'
import seq from './fxs/seq'


export default ({ config, db }) => {

    return {
        docs: docs({ db, config }),
        rev: rev({ db }),
        seq: seq({ db, config })
    }
}