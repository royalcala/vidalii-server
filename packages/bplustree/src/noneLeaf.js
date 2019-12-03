import { pipe, cond, pathEq, ifElse } from 'ramda'
import { saveLeaf } from './put'
import { NONELEAF } from './types'


const createStructureNoneLeaf = tree => {
    let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
        blocks: null,
        parent: null,
        blocksPointers: null,
        type: NONELEAF
    }
    tree.countIdNoneLeaf++
    return newNoneLeaf
}

const blocksDistribution = (nodeL, nodeR, nodeTop) => {
    let distribution = nodeL.blocks.length / 2
    nodeR.blocks = nodeL.blocks.splice(-Math.ceil(
        distribution
    ))
    nodeTop.blocks = nodeR.blocks.shift()
}

const blocksPointerDistribution = (nodeL, nodeR, nodeTop) => {
    let distribution = nodeL.blocks.length / 2
    nodeR.blocksPointers = nodeL.blocksPointers.splice(-Math.ceil(
        distribution
    ))
    nodeTop.blocksPointers = [nodeL, nodeR]
    nodeL.parent = nodeTop
    nodeR.parent = nodeTop
}

const rotateNoneLeaf = state => {
    const { selectNoneLeaf, tree } = state
    let nodeL = selectNoneLeaf
    let nodeR = createStructureNoneLeaf(tree)
    let nodeTop = createStructureNoneLeaf(tree)
    blocksDistribution(nodeL, nodeR, nodeTop)
    blocksPointerDistribution(nodeL, nodeR, nodeTop)
    return state
}

const checkRotateWithSelectNoneLeaf = ifElse(
    ({ selectNoneLeaf, tree }) => selectNoneLeaf.blocks.length === tree.noneleafMax,
    rotateNoneLeaf,
    state => state
)

const saveDataInUpNode = state => {
    const { nodeL, nodeR, tree, } = state
    state.selectNoneLeaf = nodeL.parent
    //add last one of nodeR
    state.selectNoneLeaf.blocks.push(nodeR.blocks[0])
    state.selectNoneLeaf.blocks.sort(tree.comparatorSortFx)
    state.selectNoneLeaf.blocksPointers.push(nodeR)
    // console.log('state.selectNoneLeaf.blocks.length::', state.selectNoneLeaf.blocks.length)
    return state
}


const createFirstNoneLeaf = state => {
    const { nodeL, nodeR, tree, } = state
    let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
        blocks: [nodeR.blocks[0]],
        parent: null,
        blocksPointers: [nodeL, nodeR],
        type: NONELEAF
    }
    nodeR.parent = newNoneLeaf
    nodeL.parent = newNoneLeaf
    tree.firstNoneLeaf = newNoneLeaf
    tree.countIdNoneLeaf++
    return state
}

const upNode = ifElse(
    pathEq(['nodeL', 'parent'], null),
    createFirstNoneLeaf,
    pipe(
        saveDataInUpNode,
        checkRotateWithSelectNoneLeaf
    )
)






// const selectNoneLeaf = state => {
//     const { Lleaf } = state
//     state.selectNoneLeaf = Lleaf.parent
//     return state
// }



//args ( nodeL, nodeR)
//nodeL.parent === null
//nodeL.parent.parent === null
//nodeL.parent.parent !== null

//push one
//check if needs rotate
//if is
//divide parent, 
//point Rleaf to new One
export const connectWithNoneLeaf = (Lleaf, Rleaf, tree) =>
    upNode
        // ifElse(
        //     pathEq(['nodeL', 'parent'], null),
        //     createNoneLeafWithParentNull,
        //     pipe(
        //         saveDataInUpNode,
        //         checkRotateWithSelectNoneLeaf
        //     )
        // )
        ({ nodeL: Lleaf, nodeR: Rleaf, tree })