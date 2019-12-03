import { ifElse, pipe } from 'ramda'
import { setNoneLeaf } from './types'
const setTopBlocksPointers = state => {
    const { nodeL, nodeR, nodeTop } = state
    nodeTop.blocksPointers = [nodeL, nodeR]
    nodeL.parent = nodeTop
    nodeR.parent = nodeTop
    return state
}
const setTopBlocks = state => {
    const { nodeTop, nodeR } = state
    nodeTop.blocks = nodeR.blocks.shift()
    return state
}
const createNodeTop = state => {
    const { tree } = state
    state.nodeTop = setNoneLeaf(tree)
    return state
}

export const checkRotateTop = ifElse(
    ({ nodeL }) => nodeL.parent === null,
    pipe(createNodeTop, setTopBlocks, setTopBlocksPointers),
    state => state
)