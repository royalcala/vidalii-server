import { ifElse, pipe } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf } from './noneLeaf'

const divideLeaf = state => {
    const { selectLeaf, tree } = state
    let allBlocks = selectLeaf.toBlocks    
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
    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2) 
    Rleaf.toBlocks = pointMiddleAllBlocks.nextBlock
    Rleaf.lastBlock = selectLeaf.lastBlock
    
    //Lleaf
    pointMiddleAllBlocks.nextBlock = null
    selectLeaf.nextLeaf = Rleaf
    selectLeaf.sizeBlocks = manyNextsToRight
    selectLeaf.lastBlock = pointMiddleAllBlocks

    state.Lleaf = selectLeaf
    state.Rleaf = Rleaf    

    return state
}



export const checkRotate = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.leafMax,
    pipe(divideLeaf, connectWithNoneLeaf),
    state => state
)