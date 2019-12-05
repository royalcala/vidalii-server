import { pipe, pathEq, ifElse } from 'ramda'
import { NONELEAF, NONELEAFBLOCK } from './types'
import { checkRotate } from './noneLeafRotate'


// const selectParentNoneLeafBlock = state => {
//     const { Lleaf } = state
//     state.selectNoneLeaf = Lleaf.parentNoneLeafBlock
//     return state
// }

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


const comparatorFx = (newKey, prevKey) => {
    //if true, if is less than the prevKey
    //this is a requirement that return newKey<prevKey:true
    if (newKey < prevKey)
        return true
    else
        return false
}


const insertBlockInNoneLeaf = ifElse(
    pathEq(['selectNoneLeaf', 'toBlocks'], null),
    state => {//if doesnt has blocks
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf } = state
        Lleaf.parentNoneLeafBlock = snlb
        // Rleaf.parentNoneLeafBlock = snlb
        // console.log('Rleaf.toBlocks::', Rleaf)

        snlb.noneLeaf = snl
        snlb.LChild = Lleaf
        snlb.RChild = Rleaf
        snlb.storeRef = Rleaf.toBlocks
        snl.toBlocks = snlb
        snl.lastBlock = snlb

        snl.sizeBlocks++
        return state
    },
    state => {
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf } = state
        let prev = Rleaf.toBlocks.parentNoneLeafBlock
        let prevPivotNext = prev.nextBlock
        let RleafFirstBlock = Rleaf.toBlocks
        let RleafPivotNext = Rleaf.toBlocks.nextBlock
        //
        //move the first of Rleaf to NoneLeaf
        snlb.noneLeaf = snl
        // snlb.LChild = Lleaf
        snlb.RChild = Rleaf

        prev.nextBlock = RleafFirstBlock
        prev.nextBlock.nextBlock = prevPivotNext
        Rleaf.toBlocks = RleafPivotNext
        //
        // Lleaf.parentNoneLeafBlock = snlb
        // Rleaf.parentNoneLeafBlock = snlb
        // while (prevBlock.nextBlock !== null) {
        //     if (comparatorFx(newBlock.storeRef.key, prevBlock.storeRef.key))
        //         break
        //     else
        //         prevBlock = prevBlock.nextBlock
        // }
        // if (comparatorFx(newBlock.storeRef.key, prevBlock.storeRef.key)) {
        //     //new<prev:: new->prev->null,
        //     newBlock.nextBlock = prevBlock
        //     prevBlock.backBlock = newBlock
        // } else {
        //     //new>prev:: prev->new->null      
        //     prevBlock.nextBlock = newBlock
        //     newBlock.backBlock = prevBlock
        //     selectNoneLeaf.lastBlock = newBlock
        // }
        // selectNoneLeaf.sizeBlocks++
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