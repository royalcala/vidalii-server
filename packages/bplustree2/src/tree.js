import { LEAF } from './types'

export const comparatorFx = (newKey, prevKey) => {
    //if true, if is less than the prevKey
    //this is a requirement that return newKey<prevKey:true
    if (newKey < prevKey)
        return true
    else
        return false
}

export const saveKeyValueInStore = state => {
    const { key, value, tree } = state
    tree.store[key] = {
        key,
        value
    }
    state.refStore = tree.store[key]
    return state
}

export const moveToLeaf = ({ node }) => state => {
    const { key } = state
    let block
    while (node.type !== LEAF) {
        block = node.toBlocks
        while (block.nextBlock !== null) {
            if (comparatorFx(key, block.storeRef.key))
                break
            else
                block = block.nextBlock
        }
        if (comparatorFx(key, block.storeRef.key)) {
            //key<block:: go left          
            node = block.LChild
        } else {
            //key>block:: go right  
            node = block.RChild
        }
    }
    // console.log('node.toBlocks::', node.toBlocks.storeRef)
    // console.log('node.toBlocks::', node.toBlocks.nextBlock.storeRef)
    state.selectLeaf = node
    return state

}

// export const moveToLeaf = ({ node }) => state => {
//     const { key, tree } = state
//     // let node = node === null ? tree.noneLeafs[startInNoneLeaf] : node
//     let i
//     //CASE 1
//     for (i = node.blocks.length - 1; i > -1; i--) {
//         if (key > node.blocks[i].key) {
//             node = node.blocksPointers[i + 1]
//             if (nextNode.type === 'noneleaf')
//                 return moveToLeaf({ nextNode })(state)
//             else {
//                 state.selectLeaf = nextNode
//                 return state
//             }

//         }
//     }
//     // }
//     //CASE 2
//     //is less than all
//     nextNode = nextNode.blocksPointers[0]
//     if (nextNode.type === 'noneleaf')//and key < node.blocks[0].key esto es inferido
//         return moveToLeaf({ nextNode })(state)
//     else {
//         state.selectLeaf = nextNode
//         return state
//     }

// }