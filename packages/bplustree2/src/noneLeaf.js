import { pipe, pathEq, ifElse } from 'ramda'
import { NONELEAF, NONELEAFBLOCK } from './types'
import { checkRotate } from './rotate'

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
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf, tree } = state
        // console.log('access insertBlockInNoneLeaf', Lleaf.parentNoneLeafBlock)
        Lleaf.parentNoneLeafBlock = snlb
        Rleaf.parentNoneLeafBlock = snlb
        //block
        snlb.LChild = Lleaf
        snlb.RChild = Rleaf
        snlb.noneLeaf = snl
        snlb.storeRef = Rleaf.toBlocks.storeRef

        //noneleaf
        snl.toBlocks = snlb
        snl.lastBlock = snlb
        snl.sizeBlocks++

        return state
    },
    state => {
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf, key } = state
        console.log('--------insertBLockInNoneLeaf:', key)
        let prev = Lleaf.parentNoneLeafBlock
        console.log('prev::', prev.storeRef)
        console.log('Lleaf::', Lleaf.toBlocks)
        console.log('Rleaf::', Rleaf.toBlocks)
        let prevNextPivot = prev.nextBlock
        prev.nextBlock = snlb
        //new one
        snlb.nextBlock = prevNextPivot
        snlb.backBlock = prev
        snlb.noneLeaf = snl
        snlb.RChild = Rleaf
        snlb.storeRef = Rleaf.toBlocks.storeRef//gett the first of the block

        Rleaf.parentNoneLeafBlock = snlb
        snl.sizeBlocks++
        console.log('snl.toBlocks1::', snl.toBlocks.storeRef)
        console.log('snl.toBlocks2::', snl.toBlocks.nextBlock.storeRef)
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
    // x => {
    //     return x.Lleaf.parentNoneLeafBlock === null
    // },
    pipe(createNoneLeafBlock, createNoneLeaf, insertBlockInNoneLeaf, insertNoneLeafInTree),
    pipe(createNoneLeafBlock, selectParentNoneLeaf, insertBlockInNoneLeaf, checkRotate)
)