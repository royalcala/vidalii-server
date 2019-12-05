import { ifElse, pipe } from 'ramda'
import { createNoneLeaf } from './noneLeaf'
// import { connectWithNoneLeaf } from './noneLeaf'

const divideNoneLeaf = state => {
    const { selectNoneLeaf, tree } = state
    let allBlocks = selectNoneLeaf.toBlocks
    let manyNextsToRight = Math.floor(selectNoneLeaf.sizeBlocks / 2)
    let pointMiddleAllBlocks = allBlocks
    let inNext = 1
    while (inNext < manyNextsToRight) {
        pointMiddleAllBlocks = allBlocks.next
        inNext++
    }
    //Rleaf
    let Rleaf = createLeaf(state).selectNoneLeaf
    Rleaf.backLeaf = selectNoneLeaf
    Rleaf.sizeBlocks = Math.ceil(selectNoneLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointMiddleAllBlocks.next
    Rleaf.lastBlock = selectNoneLeaf.lastBlock

    //Lleaf
    pointMiddleAllBlocks.next = null
    selectNoneLeaf.nextLeaf = Rleaf
    selectNoneLeaf.sizeBlocks = manyNextsToRight
    selectNoneLeaf.lastBlock = pointMiddleAllBlocks

    state.Lleaf = selectNoneLeaf
    state.Rleaf = Rleaf
    return state
}

const connectWithNoneLeaf = s => s

export const checkRotate = ifElse(
    ({ selectNoneLeaf, tree }) => selectNoneLeaf.sizeBlocks === tree.noneLeafMax,
    pipe(divideNoneLeaf, connectWithNoneLeaf),
    state => state
)