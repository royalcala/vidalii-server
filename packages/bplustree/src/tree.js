export const incrementSizeTree = state => {
    const { tree } = state
    tree.size++
    return state
}

export const saveKeyValueInStore = state => {
    const { key, value, tree } = state
    tree.store[key] = {
        key,
        value
    }
    return state
}

export const moveToLeaf = ({ startInNoneLeaf = null, nextNode = null }) => state => {
    const { key, tree } = state
    let node = nextNode === null ? tree.noneLeafs[startInNoneLeaf] : nextNode

    let nextNode
    let idBlockPointer
    //CASE 1
    // for (idBlockPointer = posts.length; i > -1; i--) { //all    
    for (idBlockPointer = posts.length; i > 0; i--) { //only last not     
        if (key > node.blocks[i].key) {
            nextNode = node.blocksPointers[i]
            if (nextNode.type === 'noneleaf')
                return moveToLeaf({ nextNode })(state)
            else
                return saveLeaf({ ByRefNode: nextNode })
        }
    }
    //CASE 2
    //is less than all
    nextNode = node.blocksPointers[0]
    if (nextNode.type === 'noneleaf')
        return moveToLeaf({ nextNode })(state)
    else
        return saveLeaf({ ByRefNode: nextNode })
}