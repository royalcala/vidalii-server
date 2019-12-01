import { pipe, cond, pathEq, ifElse, hasPath, pathSatisfies } from 'ramda'
import { connectWithNoneLeaf, moveToLeaf } from './noneLeaf'


// const divideLeaf = (Lleaf, tree) => {
//     const Rleaf = createLeaf({ tree })
//     Lleaf.next = Rleaf
//     Rleaf.back = Lleaf
//     let distribution = tree.leafMax / 2
//     Rleaf.blocks = Lleaf.blocks.slice(-Math.ceil(
//         distribution
//     ))
//     Lleaf.blocks.splice(-Math.ceil(-Math.floor(distribution)))
//     return Rleaf
// }
// const rotateLeaf = (leaf, tree) => {
//     cond([
//         [pathEq(['leaf', 'parent'], null), ({ leaf, tree }) => {
//             let Rleaf = divideLeaf(leaf, tree)
//             let noneLeaf = connectWithNoneLeaf(leaf, Rleaf, tree)
//             //the connection is maybe not necesary
//             Rleaf.parent = noneLeaf
//             leaf.parent = noneLeaf
//             return tree
//         }]
//     ])({ leaf, tree })
// }
// const checkBlocksUsage = (leaf, tree) => {
//     if (leaf.blocks.length === tree.leafMax)
//         return rotateLeaf(leaf, tree)
//     else
//         return tree
// }


const divideLeaf = (Lleaf, tree) => {
    const Rleaf = createLeaf({ tree })
    Lleaf.next = Rleaf
    Rleaf.back = Lleaf
    let distribution = tree.leafMax / 2
    Rleaf.blocks = Lleaf.blocks.slice(-Math.ceil(
        distribution
    ))
    Lleaf.blocks.splice(-Math.ceil(-Math.floor(distribution)))
    return Rleaf
}

const rotateLeaf = (leaf, tree) => {
    cond([
        [pathEq(['leaf', 'parent'], null), ({ leaf, tree }) => {
            let Rleaf = divideLeaf(leaf, tree)
            let noneLeaf = connectWithNoneLeaf(leaf, Rleaf, tree)
            //the connection is maybe not necesary
            Rleaf.parent = noneLeaf
            leaf.parent = noneLeaf
            // return tree
        }]
    ])({ leaf, tree })
}


const checkRotateWithSelectLeaf = state => {
    const { selectLeaf, tree } = state
    if (selectLeaf.blocks.length === tree.leafMax) {
        rotateLeaf(selectLeaf, tree)
        return state
    }
    else
        return state
}



const selectLeaf = ({ byId = null, ByRefNode = null }) => state => {
    const { tree } = state
    state.selectLeaf = byId === null ? refNode : tree.leafs[byId]
    return state
}
const saveDataWithSelectLeaf = state => {
    const { selectLeaf, tree, key } = state
    // tree.size++
    // tree.store[key] = {
    //     key,
    //     value
    // }
    // tree.leafs[0].blocks.push(tree.store[key])
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

const createLeaf = state => {
    const { tree } = state
    let nameNewLeaf = tree.countIdLeaf
    tree.leafs[nameNewLeaf] = {
        blocks: [],
        parent: null,
        next: null,
        back: null,
        type: 'leaf'
    }
    tree.countIdLeaf++
    state.Lleaf = tree.leafs[nameNewLeaf]
    // return tree.leafs[nameNewLeaf]    
    return state
}
// const saveInStoreAndIncrement = pipe(saveKeyValueInStore, incrementSizeTree)


const incrementSizeTree = state => {
    const { tree } = state
    tree.size++
    return state
}
const saveKeyValueInStore = state => {
    const { key, value, tree } = state
    tree.store[key] = {
        key,
        value
    }
    return state
}


export const saveLeaf = (by = {}) => pipe(saveKeyValueInStore, selectLeaf(by), saveDataWithSelectLeaf, incrementSizeTree, checkRotateWithSelectLeaf)

export const put = tree => (key, value) => ifElse(
    hasPath(['tree', 'store', key]),
    ({ tree }) => {//replace
        tree.store[key] = value
        return tree
    },
    ({ tree, key, value }) => { //insert   
        return cond([
            [({ tree }) => tree.size >= tree.leafMax, pipe(moveToLeaf({ startInNoneLeaf: 0 }))],
            [pathEq(['tree', 'size'], 0), pipe(saveKeyValueInStore, createLeaf, selectLeaf({ byId: 0 }), saveDataWithSelectLeaf, incrementSizeTree)],
            [({ tree }) => tree.size > 0, saveLeaf({ byId: 0 })],
        ])({ tree, key, value })


    }
)({ tree, key, value })