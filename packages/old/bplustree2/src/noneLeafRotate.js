import { ifElse, pipe } from 'ramda'
import { createNoneLeaf } from './noneLeaf'
// import { connectWithNoneLeaf } from './noneLeaf'

const divideNoneLeaf = state => {
    const { selectNoneLeaf, tree, key } = state
    console.log('---------------------------inDivideNoneLeaf:key:' + key)
    let allBlocks = selectNoneLeaf.toBlocks
    console.log('allBlocks1::', allBlocks.storeRef)
    console.log('allBlocks2::', allBlocks.nextBlock.storeRef)
    console.log('allBlocks3::', allBlocks.nextBlock.nextBlock.storeRef)
    let manyNextsToRight = Math.floor(selectNoneLeaf.sizeBlocks / 2)
    let pointMiddleAllBlocks = allBlocks
    let inNext = 1
    while (inNext < manyNextsToRight) {
        pointMiddleAllBlocks = allBlocks.nextBlock
        inNext++
    }
    //Rleaf
    let Rleaf = createNoneLeaf(state).selectNoneLeaf
    // Rleaf.backLeaf = selectNoneLeaf
    // Rleaf.nextLeaf = selectNoneLeaf.nextLeaf
    Rleaf.sizeBlocks = Math.ceil(selectNoneLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointMiddleAllBlocks.nextBlock
    Rleaf.toBlocks.backBlock = null
    Rleaf.lastBlock = selectNoneLeaf.lastBlock
    //Lleaf
    pointMiddleAllBlocks.nextBlock = null
    selectNoneLeaf.nextLeaf = Rleaf
    selectNoneLeaf.sizeBlocks = manyNextsToRight
    selectNoneLeaf.lastBlock = pointMiddleAllBlocks

    state.Lleaf = selectNoneLeaf
    state.Rleaf = Rleaf
    console.log('Lleaf.toBlocks::', state.Lleaf.toBlocks)
    console.log('Rleaf.toBlocks::', state.Rleaf.toBlocks)
    return state
}

const connectWithNoneLeaf = s => s

export const checkRotate = ifElse(
    ({ selectNoneLeaf, tree }) => selectNoneLeaf.sizeBlocks === tree.noneLeafMax,
    pipe(divideNoneLeaf, connectWithNoneLeaf),
    state => state
)