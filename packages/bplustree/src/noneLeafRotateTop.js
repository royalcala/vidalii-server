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
    nodeTop.blocks = [nodeR.blocks.shift()]
    return state
}
const createNodeTop = state => {
    const { tree } = state
    state.nodeTop = setNoneLeaf(tree)
    tree.firstNoneLeaf = state.nodeTop
    return state
}


const saveDataInNextTopNode = state => {

    const { nodeL, nodeR, tree, } = state
    state.selectNoneLeaf = nodeL.parent
    nodeR.parent = state.selectNoneLeaf
    state.selectNoneLeaf.blocks.push(nodeR.blocks.shift())
    state.selectNoneLeaf.blocksPointers.push(nodeR)
    return state
}

// const checkRotateWithSelectNoneLeaf = ifElse(
//     ({ selectNoneLeaf, tree }) => selectNoneLeaf.blocks.length === tree.noneLeafMax,
//     rotateNoneLeaf,
//     state => state
// )

export const checkRotateTop = ifElse(
    ({ nodeL }) => nodeL.parent === null,
    pipe(createNodeTop, setTopBlocks, setTopBlocksPointers),
    pipe(saveDataInNextTopNode)
)