import { ifElse, pipe } from 'ramda'
import { setNoneLeaf } from './types'
import { checkRotateTop } from './noneLeafRotateTop'

const setBlocksPointers = state => {
    const { nodeL, nodeR } = state
    let distribution = nodeL.blocks.length / 2
    nodeR.blocksPointers = nodeL.blocksPointers.splice(-Math.ceil(
        distribution
    ))
    return state
}

const setBlocks = state => {
    const { nodeL, nodeR } = state
    let distribution = nodeL.blocks.length / 2
    nodeR.blocks = nodeL.blocks.splice(-Math.ceil(
        distribution
    ))
    return state
}
const reselectNodes = state => {
    const { selectNoneLeaf, tree } = state
    state.nodeL = selectNoneLeaf
    state.nodeR = setNoneLeaf(tree)
    return state
}

const rotateNoneLeaf = pipe(
    reselectNodes,
    setBlocks,
    setBlocksPointers,
    checkRotateTop
)


export const checkRotateWithSelectNoneLeaf = ifElse(
    ({ selectNoneLeaf, tree }) => selectNoneLeaf.blocks.length === tree.noneLeafMax,
    rotateNoneLeaf,
    state => state
)