import { pipe, pathEq, ifElse } from 'ramda'
import { LEAF, NONELEAF, NONELEAFBLOCK } from './types'
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

const snlbStoreRefCopy = state => {
    const { selectNoneLeafBlock: snlb, Rleaf } = state
    snlb.storeRef = Rleaf.toBlocks.storeRef
    return state
}
const snlbStoreRefCopyAndRemove = state => {
    const { selectNoneLeafBlock: snlb, Rleaf } = state
    snlb.storeRef = Rleaf.toBlocks.storeRef
    Rleaf.toBlocks.nextBlock.LChild = Rleaf.toBlocks.RChild
    Rleaf.toBlocks = Rleaf.toBlocks.nextBlock
    Rleaf.toBlocks.backBlock = null
    if (Rleaf.toBlocks.nexblock === null)
        Rleaf.lastBlock = Rleaf.toBlocks
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
        let prev = Lleaf.parentNoneLeafBlock
        // console.log('prev::', prev.storeRef)
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
        snl.sizeBlocks++
        // console.log('snl.toBlocks1::', snl.toBlocks.storeRef)
        // console.log('snl.toBlocks2::', snl.toBlocks.nextBlock.storeRef)
        return state
    }
)

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
const hasParent = pathEq(['Lleaf', 'parentNoneLeafBlock'], null)
const fromLleaf = ifElse(
    hasParent,
    x => {
        console.log('from Leaf')
        console.log('in connectWithNoneLeaf')
        console.log('parentNoneLeafBlock===null was true')
        return pipe(insertWithNewParent, snlbStoreRefCopy, insertNoneLeafInTree)(x)
    },
    x => {
        console.log('from Leaf')
        console.log('in connectWithNoneLeaf')
        console.log('parentNoneLeafBlock===null was false')
        return pipe(insertWithSelectedParent, snlbStoreRefCopy, castSelectForRotate, checkRotate)(x)
    }
)
const fromNoneLeaf = ifElse(
    hasParent,
    x => {
        console.log('from NoneLeaf')
        console.log('in connectWithNoneLeaf')
        console.log('Hasnt a parent ')
        return pipe(insertWithNewParent, snlbStoreRefCopyAndRemove, insertNoneLeafInTree)(x)
    },
    x => {
        console.log('from NoneLeaf')
        console.log('in connectWithNoneLeaf')
        console.log('has a Parent ')
        return pipe(insertWithSelectedParent, snlbStoreRefCopyAndRemove, castSelectForRotate, checkRotate)(x)
    }
)
export const connectWithNoneLeaf = ifElse(
    pathEq(['Lleaf', 'type'], LEAF),
    fromLleaf,
    fromNoneLeaf
)
