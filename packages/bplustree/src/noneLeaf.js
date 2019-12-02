import { cond, pathEq, ifElse } from 'ramda'
import { saveLeaf } from './put'
import { NONELEAF } from './types'


export const connectWithNoneLeaf = (Lleaf, Rleaf, tree) => ifElse(
    pathEq(['Lleaf', 'parent'], null),
    ({ Lleaf, Rleaf, tree }) => {
        let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
            blocks: [Rleaf.blocks[0]],
            parent: null,
            blocksPointers: {
                0: Lleaf,
                1: Rleaf
            },
            type: NONELEAF
        }
        Rleaf.parent = newNoneLeaf
        Lleaf.parent = newNoneLeaf
        tree.countIdNoneLeaf++
        return newNoneLeaf
    },
    ({ Lleaf, Rleaf, tree }) => {
        //push one
        //check if needs rotate
        //if is
        //divide parent, 
        //point Rleaf to new One

    }
)({ Lleaf, Rleaf, tree })