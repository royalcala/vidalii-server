import { pipe, pathEq, ifElse } from 'ramda'
import { saveLeaf } from './put'
import { setNoneLeaf } from './types'
import { checkRotateWithSelectNoneLeaf } from './noneLeafRotate'

const saveDataInUpNode = state => {

    const { nodeL, nodeR, tree, } = state
    state.selectNoneLeaf = nodeL.parent
    nodeR.parent = state.selectNoneLeaf
    //nodeR is leaf or is noneleaf
    if(nodeR.type==='leaf')
    state.selectNoneLeaf.blocks.push(nodeR.blocks[0])
    else
    state.selectNoneLeaf.blocks.push(nodeR.blocks.shift())

    state.selectNoneLeaf.blocksPointers.push(nodeR)
    return state
}

export const saveUpAndCheckRotate = pipe(
    saveDataInUpNode,
    checkRotateWithSelectNoneLeaf
)

const createFirstNoneLeaf = state => {
    const { nodeL, nodeR, tree, } = state
    let newNoneLeaf = setNoneLeaf(tree)
    newNoneLeaf.blocks = [nodeR.blocks[0]]
    newNoneLeaf.blocksPointers = [nodeL, nodeR]

    nodeR.parent = newNoneLeaf
    nodeL.parent = newNoneLeaf
    tree.firstNoneLeaf = newNoneLeaf
    return state
}



const upNode = ifElse(
    pathEq(['nodeL', 'parent'], null),
    createFirstNoneLeaf,
    saveUpAndCheckRotate
)







export const connectWithNoneLeaf = (Lleaf, Rleaf, tree) =>
    upNode
        ({ nodeL: Lleaf, nodeR: Rleaf, tree })