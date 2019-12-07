import { ifElse, pipe, pathEq } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf, createNoneLeaf } from './noneLeaf'
import { LEAF } from './types'

const pointLastLleaf = state => {
    const { selectLeaf, key } = state
    console.log('---------------------------inDivide:pointLastLleaf:key:' + key)
    let pointLastLleaf = selectLeaf.toBlocks
    console.log('allBlocks1::', pointLastLleaf.storeRef)
    console.log('allBlocks2::', pointLastLleaf.nextBlock.storeRef)
    console.log('allBlocks3::', pointLastLleaf.nextBlock.nextBlock.storeRef)
    let manyNextsToRight = Math.floor(selectLeaf.sizeBlocks / 2)
    let inNext = 1
    while (inNext < manyNextsToRight) {
        pointLastLleaf = pointLastLleaf.nextBlock
        inNext++
    }
    state.pointLastLleaf = pointLastLleaf
    return state
}
const Rleaf = state => {
    const { pointLastLleaf, selectLeaf } = state
    let Rleaf
    Rleaf = createLeaf({}).selectLeaf
    Rleaf.backLeaf = selectLeaf
    Rleaf.nextLeaf = selectLeaf.nextLeaf

    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointLastLleaf.nextBlock
    Rleaf.toBlocks.backBlock = null
    Rleaf.lastBlock = selectLeaf.lastBlock

    state.Rleaf = Rleaf
    return state
}
const NoneRleaf = state => {
    const { pointLastLleaf, selectLeaf } = state
    let Rleaf
    Rleaf = createNoneLeaf({}).selectNoneLeaf

    Rleaf.sizeBlocks = Math.ceil(selectLeaf.sizeBlocks / 2)
    Rleaf.toBlocks = pointLastLleaf.nextBlock
    Rleaf.toBlocks.backBlock = null
    Rleaf.lastBlock = selectLeaf.lastBlock

    state.Rleaf = Rleaf
    return state
}

const Lleaf = state => {
    const { pointLastLleaf, selectLeaf, Rleaf, tree } = state
    // console.log('selectLeaf::', selectLeaf.toBlocks)    
    pointLastLleaf.nextBlock = null
    selectLeaf.nextLeaf = Rleaf
    selectLeaf.sizeBlocks = Math.floor(selectLeaf.sizeBlocks / 2)
    selectLeaf.lastBlock = pointLastLleaf

    state.Lleaf = selectLeaf
    // console.log('is equals::', pointLastLleaf === selectLeaf.toBlocks)
    // console.log('Lleaf.toBlocks::', selectLeaf.toBlocks)
    // console.log('Rleaf.toBlocks::', Rleaf.toBlocks)
    return state
}


const isLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.leafMax,
    pipe(pointLastLleaf, Rleaf, Lleaf,
        x => {
            console.log('before to connect noneleaf')
            console.log('x.Lleaf.parentNoneLeafBlock===null::', x.Lleaf.parentNoneLeafBlock === null)
            return x
        },
        x => {
            console.log('before result')
            let result = connectWithNoneLeaf(x)

            return result
        },
        x => {
            console.log('after connect')
            // console.log('x::',x)
            return x
        }
    ),
    state => state
)
const isNoneLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.sizeBlocks === tree.noneLeafMax,
    pipe(pointLastLleaf, NoneRleaf, Lleaf, connectWithNoneLeaf),
    state => state
)
export const checkRotate = ifElse(
    pathEq(['selectLeaf', 'type'], LEAF),
    // state => {
    //     console.log('in checkRotate')
    //     console.log('state.selectLeaf.type::', state.selectLeaf.type)
    //     return pathEq(['selectLeaf', 'type'], LEAF)(state)
    // },
    isLeaf,
    x => {
        console.log('stop isNoneLeaf and require rotate-->')
        return isNoneLeaf(x)
    }
)