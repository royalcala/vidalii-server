import { ifElse, pathEq } from 'ramda'
import { LEAF, LEAFBLOCK } from './types'

export const createLeafBlock = state => {
    const block = {
        nextBlock: null,
        backBlock: null,
        storeRef: null,
        type: LEAFBLOCK,
    }
    state.selectLeafBlock = block
    return state
}

export const createLeaf = state => {
    const { tree } = state
    // let nameNewLeaf = tree.countIdLeaf
    const leaf = {
        parent: null,
        nextLeaf: null,
        backLeaf: null,
        sizeBlocks: 0,
        toBlocks: null,
        lastBlock: null,
        type: LEAF
    }

    // tree.firstleaf = leaf
    state.selectLeaf = leaf
    return state
}
export const selectFirstLeaf = state => {
    const { tree } = state
    state.selectLeaf = tree.leafs
    return state
}
export const insertRefStoreInBlock = state => {
    const { refStore, selectLeafBlock } = state
    selectLeafBlock.storeRef = refStore
    return state
}


const insertWithoutBlocks = [// doesnt has blocks
    pathEq(['selectLeaf', 'toBlocks'], null),
    state => {//if doesnt has blocks
        const { selectLeaf, selectLeafBlock, } = state
        //first block
        selectLeaf.toBlocks = selectLeafBlock
        //last block
        selectLeaf.lastBlock = selectLeafBlock
        selectLeaf.sizeBlocks++
        return state
    },
]

const comparatorFx = (newKey, key) => {
    //if true, newKey is bigger than nextKey, check with the next
    if (newKey > key)
        return true
    else
        return false
}

const insertHasOnlyOneBlock = [//has only one block
    pathEq(['selectLeaf', 'toBlocks', 'nextBlock'], null),
    state => {
        const { selectLeaf, selectLeafBlock, } = state
        if (comparatorFx(selectLeafBlock.storeRef.key, selectLeaf.toBlocks.storeRef.key)) {
            //first block
            selectLeaf.toBlocks = selectLeafBlock
            //last block
            selectLeaf.lastBlock = selectLeafBlock
            selectLeaf.sizeBlocks++
        } else {

        }
        // if (selectLeaf.toBlocks.storeRef.key > selectLeafBlock.storeRef.key) {

        // }

        return state
    }
]
export const insertBlockInLeaf =
    cond([
        insertWithoutBlocks,
        insertHasOnlyOneBlock,
        [//has many blocks
            () => true,
            () => {

            }

        ]
    ])
// ifElse(
//     pathEq(['selectLeaf', 'toBlocks'], null),
//     state => {//if doesnt has blocks
//         const { selectLeaf, selectLeafBlock, } = state
//         //first block
//         selectLeaf.toBlocks = selectLeafBlock
//         //last block
//         selectLeaf.lastBlock = selectLeafBlock
//         selectLeaf.sizeBlocks++
//         return state
//     },
//     ifElse(
//         pathEq(['selectLeaf', 'toBlocks', 'nextBlock'], null),
//         state => {//if only has one block
//             const { selectLeaf, selectLeafBlock, } = state
//             if (selectLeafBlock.storeRef)
//                 selectLeaf.lastBlock.nextBlock = selectLeafBlock
//             selectLeaf.lastBlock = selectLeafBlock
//             selectLeaf.sizeBlocks++
//             return state
//         }
//     )
// {
//     const { selectLeaf, selectLeafBlock, } = state
//     let start = selectLeaf.toBlocks
//     let newKey = selectLeafBlock.storeRef.key


//     selectLeaf.lastBlock.nextBlock = selectLeafBlock
//     selectLeaf.lastBlock = selectLeafBlock
//     selectLeaf.sizeBlocks++
//     return state
// }

// export const insertBlockInLeaf = state => {
//     const { selectLeaf, selectLeafBlock, } = state
//     selectLeaf.toBlocks = selectLeafBlock
//     selectLeaf.sizeBlocks++
//     return state

// }
export const insertLeafInTree = state => {
    const { selectLeaf, tree } = state
    tree.leafs = selectLeaf
    return state
}
// export const selectLeaf = ({ byId = null, ByRefNode = null }) => state => {
//     const { tree } = state
//     state.selectLeaf = byId === null ? ByRefNode : tree.leafs[byId]
//     return state
// }