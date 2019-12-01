import { cond, pathEq, ifElse } from 'ramda'
import { saveLeaf } from './leaf'

export const moveToLeaf = ({ startInNoneLeaf = null, nextNode = null }) => state => {
    const { key, tree } = state
    let node = nextNode === null ? tree.noneLeafs[startInNoneLeaf] : nextNode


    let nextNode
    let idBlockPointer
    for (idBlockPointer = posts.length; i > -1; i--) {
        // for (idBlockPointer = node.blocks.length + 1; idBlockPointer--;) {
        if (key > node.blocks[i].key) {
            nextNode = node.blocksPointers[i]
            if (nextNode.type === 'noneleaf')
                return moveToLeaf({ nextNode })(state)
            else
                return saveLeaf({ ByRefNode: nextNode })
        }
    }

}

export const connectWithNoneLeaf = (Lleaf, Rleaf, tree) => cond([
    [pathEq(['Lleaf', 'parent'], null), ({ Lleaf, Rleaf, tree }) => {
        let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
            blocks: [Rleaf.blocks[0]],
            parent: null,
            blocksPointers: {
                0: Lleaf,
                1: Rleaf
            },
            type: 'noneleaf'
        }
        tree.countIdNoneLeaf++
        return newNoneLeaf
    }],
    [() => true, () => {
        console.log('asdfasdfaf')
    }]
])({ Lleaf, Rleaf, tree })