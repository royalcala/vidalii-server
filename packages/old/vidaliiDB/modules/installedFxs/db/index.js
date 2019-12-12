const R = require('ramda')

const typesDB = R.pipe(
    require('./readInstalled'),
    R.toPairs,
    R.map(
        ([nameDB, crudDB]) => ({
            [nameDB]: {
                crud: crudDB,
                nameDB
            }
        })
    ),
    R.mergeAll
)(__dirname + '/' + 'installedTypesDB')

const initEachShardConfig = R.map(
    ([shardName, initShardConfigFx]) => ({
        [shardName]: initShardConfigFx({
            typesDB
        })
    })
)
const initialization = ({ input }) => R.pipe(
    R.toPairs,
    R.map(
        ([dbName, { shards }]) => {
            console.log(dbName, ':shards:', shards)
            return {
                [dbName]: R.pipe(
                    R.toPairs,
                    initEachShardConfig,
                    R.mergeAll
                )(shards)
            }
        }
    ),
    R.mergeAll
)(input)

module.exports = ({ input }) => {
    const init = initialization({ input })
    // console.log('databases::', init)
    return init
}