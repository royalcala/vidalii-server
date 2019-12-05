import { pipe, pathEq, ifElse } from 'ramda'
import { NONELEAF, NONELEAFBLOCK } from './types'
// import { checkRotate } from './noneLeafRotate'

const selectParentNoneLeaf = state => {
    const { Lleaf } = state
    state.selectNoneLeaf = Lleaf.parentNoneLeafBlock.noneLeaf
    return state
}

const insertNoneLeafInTree = state => {
    const { selectNoneLeaf, tree } = state
    tree.noneLeafs = selectNoneLeaf
    return state
}

const insertBlockInNoneLeaf = ifElse(
    pathEq(['selectNoneLeaf', 'toBlocks'], null),
    state => {//if doesnt has blocks
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf } = state
        Lleaf.parentNoneLeafBlock = snlb
        Rleaf.parentNoneLeafBlock = snlb

        //noneleaf-block
        snlb.noneLeaf = snl
        snlb.LChild = Lleaf
        snlb.RChild = Rleaf
        snlb.storeRef = Rleaf.toBlocks.storeRef

        //noneleaf
        snl.toBlocks = snlb
        snl.lastBlock = snlb
        snl.sizeBlocks++
        return state
    },
    state => {
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf } = state
        let prev = Lleaf.parentNoneLeafBlock
        let prevNextPivot = prev.nextBlock
        prev.nextBlock = snlb

        //noneleaf-block
        snlb.noneLeaf = snl
        snlb.RChild = Rleaf
        snlb.storeRef = Rleaf.toBlocks.storeRef//gett the first of the block
        snlb.nextBlock = prevNextPivot
        snlb.backBlock = prev

        Rleaf.parentNoneLeafBlock = snlb
        snl.sizeBlocks++
        return state
    }
)

export const createNoneLeaf = state => {
    const noneLeaf = {
        parent: null,
        sizeBlocks: 0,
        toBlocks: null,
        lastBlock: null,
        type: NONELEAF
    }
    state.selectNoneLeaf = noneLeaf
    return state
}

const createNoneLeafBlock = state => {
    const block = {
        noneLeaf: null,
        LChild: null,
        RChild: null,
        nextBlock: null,
        backBlock: null,
        storeRef: null,
        type: NONELEAFBLOCK,
    }
    state.selectNoneLeafBlock = block
    return state
}
export const connectWithNoneLeaf = ifElse(
    pathEq(['Lleaf', 'parentNoneLeafBlock'], null),
    pipe(createNoneLeafBlock, createNoneLeaf, insertBlockInNoneLeaf, insertNoneLeafInTree),
    pipe(createNoneLeafBlock, selectParentNoneLeaf, insertBlockInNoneLeaf)
)