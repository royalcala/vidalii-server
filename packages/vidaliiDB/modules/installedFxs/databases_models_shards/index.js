const R = require('ramda')


const getCondShards = ({ databases }) => R.pipe(
    R.toPairs,
    R.map(
        ([nameDatabase, dataShards]) => ({
            [nameDatabase]: R.pipe(
                R.toPairs,
                R.map(
                    ([nameShard, dataShard]) => ({
                        [nameShard]: dataShard.cond
                    })
                ),
                R.mergeAll
            )(dataShards)
        })
    )
)(databases)

const initialization = ({ databases, databases_models }) => {
    let condShards = getCondShards({ databases })
    console.log('condShards::', condShards)
    return ''
    // return R.pipe(
    //     R.toPairs,
    //     R.map(
    //         ([nameDatabase, shards]) => R.pipe(
    //             R.toPairs,
    //             R.map(
    //                 ([nameShard, crud]) => {

    //                     return {
    //                         [nameShard]: input[nameDatabase].databases[nameShard].shard.cond
    //                     }
    //                 }
    //             )
    //         )(shards)
    //     )
    // )(databases)
}
module.exports = ({ databases }) => {
    // console.log('input::', input)
    // console.log('databases::', databases)
    const init = initialization({
        databases
    })
    // console.log('shards::', init)
    // console.log('init::', init)
    return ''
}