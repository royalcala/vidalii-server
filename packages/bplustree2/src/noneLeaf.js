import { pipe, pathEq, ifElse } from 'ramda'
import { LEAF, NONELEAF, NONELEAFBLOCK } from './types'
import { checkRotate } from './rotate'

export const createNoneLeaf = state => {
    const noneLeaf = {
        parentNoneLeafBlock: null,
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

const selectParentNoneLeaf = state => {
    const { Lleaf } = state
    //     console.log('  Lleaf.toBlocks.storeRef.key::', Lleaf.toBlocks.storeRef.key)
    //    console.log(' Lleaf.parentNoneLeafBlock.noneLeaf.toBlocks.storeRef.key::', Lleaf.parentNoneLeafBlock.noneLeaf.toBlocks.storeRef.key)
    //     console.log('  Rleaf.toBlocks.storeRef.key::', state.Rleaf.toBlocks.storeRef.key)
    state.selectNoneLeaf = Lleaf.parentNoneLeafBlock.noneLeaf

    return state
}

const insertNoneLeafInTree = state => {
    const { selectNoneLeaf, tree } = state
    tree.noneLeafs = selectNoneLeaf
    return state
}

const snlbStoreRefCopy = state => {
    const { selectNoneLeafBlock: snlb, Rleaf } = state
    snlb.storeRef = Rleaf.toBlocks.storeRef
    return state
}
const snlbStoreRefCopyAndRemove = state => {
    const { selectNoneLeafBlock: snlb, Rleaf } = state
    let RFirstBlock = Rleaf.toBlocks
    let RSecondBlock = RFirstBlock.nextBlock
    snlb.storeRef = RFirstBlock.storeRef
    RSecondBlock.LChild = RFirstBlock.RChild
    RFirstBlock.RChild.parentNoneLeafBlock = RSecondBlock
    Rleaf.toBlocks = RSecondBlock
    Rleaf.toBlocks.backBlock = null
    if (Rleaf.toBlocks.nexblock === null)
        Rleaf.lastBlock = Rleaf.toBlocks

    Rleaf.sizeBlocks--
    // console.log('access2_End')
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
        //copy in leaf and in noneleaf remove from Rleaf
        // snlb.storeRef = Rleaf.toBlocks.storeRef

        //noneleaf
        snl.toBlocks = snlb
        snl.lastBlock = snlb
        snl.sizeBlocks++

        return state
    },
    state => {
        const { selectNoneLeaf: snl, selectNoneLeafBlock: snlb, Lleaf, Rleaf, key } = state
        // console.log('holis')
        let prev = Lleaf.parentNoneLeafBlock
        // console.log('Lleaf::', Lleaf.toBlocks)
        // console.log('Rleaf::', Rleaf.toBlocks)
        let prevNextPivot = prev.nextBlock
        prev.nextBlock = snlb
        //new one
        snlb.nextBlock = prevNextPivot
        snlb.backBlock = prev
        snlb.noneLeaf = snl
        snlb.RChild = Rleaf
        //copy in leaf and in noneleaf remove from Rleaf
        // snlb.storeRef = Rleaf.toBlocks.storeRef

        Rleaf.parentNoneLeafBlock = snlb
        // console.log('Rleaf.parentNoneLeafBlock.storeRef.key::',Rleaf.parentNoneLeafBlock.storeRef) 
        snl.sizeBlocks++
        // console.log('snl.toBlocks1::', snl.toBlocks.storeRef)
        // console.log('snl.toBlocks2::', snl.toBlocks.nextBlock.storeRef)
        return state
    }
)

const castSelectForRotate = state => {
    state.selectLeaf = state.selectNoneLeaf
    return state
}
// export const connectWithNoneLeaf = state => {
//     console.log('in connectWithNoneLeaf')
//     return ifElse(
//         pathEq(['Lleaf', 'parentNoneLeafBlock'], null),
//         pipe(
//             createNoneLeafBlock, createNoneLeaf, insertBlockInNoneLeaf, insertNoneLeafInTree
//         ),
//         pipe(createNoneLeafBlock, selectParentNoneLeaf, insertBlockInNoneLeaf,
//             castSelectForRotate,
//             s => {
//                 console.log('s::', Object.keys(s))
//                 return s
//             },
//             // checkRotate
//         )
//     )(state)
// }

const insertWithSelectedParent = pipe(createNoneLeafBlock, selectParentNoneLeaf, insertBlockInNoneLeaf)
const insertWithNewParent = pipe(createNoneLeafBlock, createNoneLeaf, insertBlockInNoneLeaf)
const withoutParent = pathEq(['Lleaf', 'parentNoneLeafBlock'], null)
const fromLleaf = ifElse(
    withoutParent,
    pipe(insertWithNewParent, snlbStoreRefCopy, insertNoneLeafInTree),
    s => pipe(insertWithSelectedParent, snlbStoreRefCopy, castSelectForRotate, checkRotate)(s)
)
const fromNoneLeaf = ifElse(
    withoutParent,
    pipe(insertWithNewParent, snlbStoreRefCopyAndRemove, insertNoneLeafInTree),
    s => pipe(insertWithSelectedParent,
        snlbStoreRefCopyAndRemove,
        castSelectForRotate,
        checkRotate
    )(s)

)
export const connectWithNoneLeaf = ifElse(
    pathEq(['Lleaf', 'type'], LEAF),
    fromLleaf,
    fromNoneLeaf
)
