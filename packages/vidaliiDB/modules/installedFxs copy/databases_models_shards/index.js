const initCondShards = require('./initCondShards')
const getCondShards = require('./getCondShards')


// const initialization = ({ databases, databases_models }) => {
//     let condShards = getCondShards({ databases })
//     console.log('condShards::', condShards)
//     return ''
// }
module.exports = ({ databases, databases_models }) => {
    // console.log('input::', input)
    // console.log('databases::', databases)
    // console.log('databases_models::', databases_models)

    // console.log('shardsTypesDB::', shardsTypesDB)

    let condShards = getCondShards({ databases, databases_models })
    // console.log('condShards::', condShards)
    let result = initCondShards({ condShards })
    // console.log('result::', result)


    // let shardsCrud = withShardsCrud({ condShards, databases_models })
    // console.log('shardsCrud', shardsCrud)


    // console.log('shards::', init)
    // console.log('init::', init)
    return result
}