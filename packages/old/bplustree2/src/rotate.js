import { ifElse, pipe, pathEq, has } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf, createNoneLeaf } from './noneLeaf'
import { LEAF } from './types'

const pointLast_Lleaf_block = state => {
    const { selectLeaf, key } = state
    // console.log('---------------------------inDivide:pointLast_Lleaf_block:key:' + key)
    let pointLast_Lleaf_block = selectLeaf.toBlocks
    // console.log('pointLast_Lleaf_block1::', pointLast_Lleaf_block.type)
    // if (selectLeaf.parentNoneLeafBlock) {
    //     console.log('pointLast_Lleaf_block.storeRef::',
    //         Object.keys(selectLeaf.parentNoneLeafBlock))
    //     console.log('selectLeaf.parentNoneLeafBlock.storeRef::', selectLeaf.parentNoneLeafBlock.storeRef)
    // }
    // console.log('allBlocks1::', pointLast_Lleaf_block.storeRef)
    // console.log('allBlocks2::', pointLast_Lleaf_block.nextBlock.storeRef)
    // console.log('allBlocks3::', pointLast_Lleaf_block.nextBlock.nextBlock.storeRef)
    let manyNextsToRight = Math.floor(selectLeaf.sizeBlocks / 2)
    let inNext = 1
    while (inNext < manyNextsToRight) {
        pointLast_Lleaf_block = pointLast_Lleaf_block.nextBlock
        inNext++
    }
    state.pointLast_Lleaf_block = pointLast_Lleaf_block
    return state
}
const Rleaf = state => {
    const { pointLast_Lleaf_block, selectLeaf } = state
    let Rleaf
    Rleaf = createLeaf({}).selectLeaf
    Rleaf.backLeaf = selectLeaf
    Rleaf.nextLeaf = selectLeaf.nextLeaf

    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointLast_Lleaf_block.nextBlock
    Rleaf.toBlocks.backBlock = null
    Rleaf.lastBlock = selectLeaf.lastBlock

    state.Rleaf = Rleaf
    return state
}
const NoneRleaf = state => {
    const { pointLast_Lleaf_block, selectLeaf } = state
    let Rleaf
    Rleaf = createNoneLeaf({}).selectNoneLeaf
    // console.log('Rleaf::',Rleaf)
    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2)
    // console.log('pointLast_Lleaf_block::', pointLast_Lleaf_block.storeRef)
    Rleaf.toBlocks = pointLast_Lleaf_block.nextBlock //2->3
    let pivot = Rleaf.toBlocks
    //change all to noneleaf new
    while (pivot !== null) {
        pivot.noneLeaf = Rleaf
        pivot = pivot.nextBlock
    }

    Rleaf.lastBlock = selectLeaf.lastBlock

    state.Rleaf = Rleaf
    return state
}


const Lleaf = state => {
    const { pointLast_Lleaf_block, selectLeaf, Rleaf, tree } = state
    // console.log('selectLeaf::', selectLeaf.toBlocks)    
    pointLast_Lleaf_block.nextBlock = null
    selectLeaf.nextLeaf = Rleaf
    selectLeaf.sizeBlocks = Math.floor(selectLeaf.sizeBlocks / 2)
    selectLeaf.lastBlock = pointLast_Lleaf_block

    state.Lleaf = selectLeaf
    // console.log('is equals::', pointLast_Lleaf_block === selectLeaf.toBlocks)
    // console.log('Lleaf.toBlocks::', selectLeaf.toBlocks)
    // console.log('Rleaf.toBlocks::', Rleaf.toBlocks)
    return state
}


const isLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.leafMax,
    pipe(pointLast_Lleaf_block, Rleaf, Lleaf,
        x => {
            // console.log('before to connect noneleaf')            
            return x
        },
        connectWithNoneLeaf
        // state => {
        //     console.log('before result:input:', state.key)
        //     console.log('LallBlocks1::', state.Lleaf.toBlocks.storeRef)
        //     console.log('LallBlocks2::', state.Lleaf.toBlocks.nextBlock)
        //     console.log('RallBlocks1::', state.Rleaf.toBlocks.storeRef)
        //     console.log('RallBlocks2::', state.Rleaf.toBlocks.nextBlock.storeRef)
        //     let result = connectWithNoneLeaf(state)

        //     return result
        // },
        // x => {
        //     console.log('after connect')
        //     // console.log('x::',x)
        //     return x
        // }
    ),
    state => state
)
const isNoneLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.noneLeafMax,
    pipe(pointLast_Lleaf_block, NoneRleaf, Lleaf, connectWithNoneLeaf),
    state => state
)
export const checkRotate = ifElse(
    pathEq(['selectLeaf', 'type'], LEAF),
    isLeaf,
    isNoneLeaf
)