import { LEAF } from './types'

export const createLeaf = state => {
    const { tree } = state
    let nameNewLeaf = tree.countIdLeaf
    tree.leafs[nameNewLeaf] = {
        blocks: [],
        parent: null,
        next: null,
        back: null,
        type: LEAF
    }
    tree.countIdLeaf++
    return state
}

export const selectLeaf = ({ byId = null, ByRefNode = null }) => state => {
    const { tree } = state
    state.selectLeaf = byId === null ? refNode : tree.leafs[byId]
    return state
}

export const saveDataWithSelectLeaf = state => {
    const { selectLeaf, tree, key } = state
    selectLeaf.blocks.push(tree.store[key])
    selectLeaf.blocks.sort((a, b) => {
        if (a.key > b.key) {
            return 1;
        }
        if (a.key < b.key) {
            return -1;
        }
        // a must be equal to b
        return 0;
    })
    // return checkBlocksUsage(tree.leafs[0], tree)
    return state
}





