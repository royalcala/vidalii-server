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

export const saveDataWithSelectLeaf = state => {
    const { selectLeaf, tree, key } = state
    selectLeaf.blocks.push(tree.store[key])
    selectLeaf.blocks.sort(tree.comparatorSortFx)
    return state
}

export const selectLeaf = ({ byId = null, ByRefNode = null }) => state => {
    const { tree } = state
    state.selectLeaf = byId === null ? ByRefNode : tree.leafs[byId]
    return state
}