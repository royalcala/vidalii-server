import rev from './fxs/rev'
import docs from './fxs/docsDefault'
import seq from './fxs/seq'

export default globalData => db => {

    return {
        docs: docs({ db }),
        // rev: rev({ db }),
        rev: db.rev,
        seq: seq({ db, config: globalData.config })
    }
}
