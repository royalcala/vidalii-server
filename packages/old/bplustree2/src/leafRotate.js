import { ifElse, pipe } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf } from './noneLeaf'

const divideLeaf = state => {
    const { selectLeaf, tree, key } = state
    console.log('---------------------------inDivide:key:' + key)
    let allBlocks = selectLeaf.toBlocks
    console.log('allBlocks1::', allBlocks.storeRef)
    console.log('allBlocks2::', allBlocks.nextBlock.storeRef)
    console.log('allBlocks3::', allBlocks.nextBlock.nextBlock.storeRef)
    let manyNextsToRight = Math.floor(selectLeaf.sizeBlocks / 2)
    let pointMiddleAllBlocks = allBlocks
    let inNext = 1
    while (inNext < manyNextsToRight) {
        pointMiddleAllBlocks = allBlocks.nextBlock
        inNext++
    }
    //Rleaf
    let Rleaf = createLeaf(state).selectLeaf
    Rleaf.backLeaf = selectLeaf
    Rleaf.nextLeaf = selectLeaf.nextLeaf
    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointMiddleAllBlocks.nextBlock
    Rleaf.toBlocks.backBlock = null
    Rleaf.lastBlock = selectLeaf.lastBlock
    //Lleaf
    pointMiddleAllBlocks.nextBlock = null
    selectLeaf.nextLeaf = Rleaf
    selectLeaf.sizeBlocks = manyNextsToRight
    selectLeaf.lastBlock = pointMiddleAllBlocks

    state.Lleaf = selectLeaf
    state.Rleaf = Rleaf
    console.log('Lleaf.toBlocks::', state.Lleaf.toBlocks)
    console.log('Rleaf.toBlocks::', state.Rleaf.toBlocks)
    return state
}



export const checkRotate = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.leafMax,
    pipe(divideLeaf, connectWithNoneLeaf),
    state => state
)