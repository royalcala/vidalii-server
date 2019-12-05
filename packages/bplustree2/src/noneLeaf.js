import { pipe, pathEq, ifElse } from 'ramda'
import { NONELEAF, NONELEAFBLOCK } from './types'
import { checkRotateWithSelectNoneLeaf } from './noneLeafRotate'

const saveDataInUpNode = state => {
    const { nodeL, nodeR, tree, } = state
    state.selectNoneLeaf = nodeL.parent
    nodeR.parent = state.selectNoneLeaf
    if (nodeR.type === 'leaf')
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
    const { Lleaf, Rleaf, tree, } = state

    // let newNoneLeaf = setNoneLeaf(tree)
    // if (Lleaf.type === LEAF)
    //     newNoneLeaf.blocks = [nodeR.blocks[0]]
    // else
    //     newNoneLeaf.blocks = [nodeR.blocks.shift()]

    // newNoneLeaf.blocksPointers = [nodeL, nodeR]

    // nodeR.parent = newNoneLeaf
    // nodeL.parent = newNoneLeaf
    // tree.firstNoneLeaf = newNoneLeaf
    return state
}

const createNoneLeafBlock = state => {
    const block = {
        nextBlock: null,
        backBlock: null,
        storeRef: null,
        type: NONELEAFBLOCK,
    }
    state.selectNoneLeafBlock = block
    return state
}

const createNoneLeaf = state => {
    const { tree } = state
    // let nameNewLeaf = tree.countIdLeaf
    const noneLeaf = {
        parent: null,
        // nextLeaf: null,
        // backLeaf: null,
        sizeBlocks: 0,
        toBlocks: null,
        lastBlock: null,
        type: NONELEAF
    }
    // tree.firstleaf = leaf
    state.selectNoneLeaf = noneLeaf
    return state
}

const insertBlockInNoneLeaf = ifElse(
    pathEq(['selectNoneLeaf', 'toBlocks'], null),
    state => {
        const { selectNoneLeaf, selectNoneLeafBlock, } = state
        //first block
        selectNoneLeaf.toBlocks = selectNoneLeafBlock
        //last block
        selectNoneLeaf.lastBlock = selectNoneLeafBlock
        selectNoneLeaf.sizeBlocks++
        return state
    },
    state => {
        // const { selectNoneLeaf, selectNoneLeafBlock, } = state
        // selectNoneLeaf.lastBlock.nextBlock = selectNoneLeafBlock
        // selectNoneLeaf.lastBlock = selectNoneLeafBlock
        // selectNoneLeaf.sizeBlocks++
        // return state
    }
)

const insertNoneLeafInTree = state => {
    const { selectNoneLeaf, tree } = state
    tree.noneLeaf = selectNoneLeaf
    return state
}

export const connectWithNoneLeaf = ifElse(
    pathEq(['Lleaf', 'parent'], null),
    pipe(createNoneLeafBlock, createNoneLeaf, insertBlockInNoneLeaf, insertNoneLeafInTree),
    saveUpAndCheckRotate
)