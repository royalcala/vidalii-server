import { ifElse, pathEq} from 'ramda'
import { LEAF, LEAFBLOCK } from './types'
import { comparatorFx } from './tree'

export const createLeaf = state => {
    const leaf = {
        parentNoneLeafBlock: null,
        nextLeaf: null,
        backLeaf: null,
        sizeBlocks: 0,
        toBlocks: null,
        lastBlock: null,
        type: LEAF
    }
    state.selectLeaf = leaf
    return state
}

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

// const comparatorFx = (newKey, prevKey) => {
//     //if true, if is less than the prevKey
//     //this is a requirement that return newKey<prevKey:true
//     if (newKey < prevKey)
//         return true
//     else
//         return false
// }

export const insertBlockInLeaf = ifElse(
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
    state => {
        const { selectLeaf, selectLeafBlock, key } = state
        // console.log('---------------------------insertBlock:key:' + key)
        let prevBlock = selectLeaf.toBlocks
        // console.log('selectLeaf.toBlocks::', selectLeaf.toBlocks)
        let newBlock = selectLeafBlock
        while (prevBlock.nextBlock !== null) {
            if (comparatorFx(newBlock.storeRef.key, prevBlock.storeRef.key))
                break
            else
                prevBlock = prevBlock.nextBlock
        }
        // console.log('prevBlock::', prevBlock)
        // console.log('prevBlock.backBlock::', prevBlock.backBlock)
        if (prevBlock === selectLeaf.toBlocks) {
            // console.log('yes is equal')
            if (comparatorFx(newBlock.storeRef.key, selectLeaf.toBlocks.storeRef.key)) {
                //new<prev::
                selectLeaf.toBlocks = newBlock
                newBlock.nextBlock = prevBlock
                prevBlock.backBlock = newBlock

            } else {
                //prev>new::     
                // prevBlock.nextBlock = newBlock
                // newBlock.backBlock = prevBlock
                // selectLeaf.lastBlock = newBlock

                let prevChild = prevBlock.nextBlock
                prevBlock.nextBlock = newBlock
                newBlock.backBlock = prevBlock
                newBlock.nextBlock = prevChild
                if (newBlock.nextBlock === null)
                    selectLeaf.lastBlock = newBlock
            }
        } else {
            // console.log('Not  equal')
            if (comparatorFx(newBlock.storeRef.key, prevBlock.storeRef.key)) {
                // console.log('is<')
                //new<prev::
                let parentPrev = prevBlock.backBlock
                parentPrev.nextBlock = newBlock
                newBlock.backBlock = parentPrev
                newBlock.nextBlock = prevBlock
                prevBlock.backBlock = newBlock

            } else {
                // console.log('is>')
                //prev>new::   
                let prevChild = prevBlock.nextBlock
                prevBlock.nextBlock = newBlock
                newBlock.backBlock = prevBlock
                newBlock.nextBlock = prevChild
                if (newBlock.nextBlock === null)
                    selectLeaf.lastBlock = newBlock

            }
        }

        selectLeaf.sizeBlocks++
        return state
    }
)

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