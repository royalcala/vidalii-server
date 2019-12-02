import { ifElse, pipe } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf } from './noneLeaf'
const divideLeaf = (Lleaf, tree) => {
    let Rleaf = pipe(
        createLeaf,
        ({ tree }) => {
            return tree.leafs[tree.countIdLeaf - 1]
        }
    )({ tree })

    Lleaf.next = Rleaf
    Rleaf.back = Lleaf
    let distribution = tree.leafMax / 2
    Rleaf.blocks = Lleaf.blocks.slice(-Math.ceil(
        distribution
    ))
    Lleaf.blocks.splice(-Math.ceil(-Math.floor(distribution)))
    return Rleaf
}

const rotateLeaf = state => {
    const { selectLeaf, tree } = state
    state.Rleaf = divideLeaf(selectLeaf, tree)
    state.noneLeaf = connectWithNoneLeaf(selectLeaf, state.Rleaf, tree)

    return state
}

export const checkRotateWithSelectLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.blocks.length === tree.leafMax,
    rotateLeaf,
    state => state
)