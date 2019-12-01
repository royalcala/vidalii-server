import noneLeaf from './noneLeaf'
import leaf from './leaf'
import { initTree } from './initTree'
import { cond, pathEq, ifElse, hasPath } from 'ramda'

const connectWithNoneLeaf = (Lleaf, Rleaf, tree) => cond([
    [pathEq(['Lleaf', 'parent'], null), ({ Lleaf, Rleaf, tree }) => {
        tree.countIdNoneLeaf++
        let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
            blocks: [Rleaf.blocks[0]],
            parent: null,
            blocksPointers: {
                0: Lleaf,
                1: Rleaf
            },
            type: 'noneleaf'
        }
        return newNoneLeaf
    }],
    [() => true, () => {
        console.log('asdfasdfaf')
    }]
])({ Lleaf, Rleaf, tree })

const createLeaf = tree => {
    tree.countIdLeaf++
    let nameNewLeaf = tree.countIdLeaf
    tree.leafs[nameNewLeaf] = {
        blocks: [],
        parent: null,
        next: null,
        back: null,
        type: 'leaf'
    }
    return tree.leafs[nameNewLeaf]
}
const divideLeaf = (Lleaf, tree) => {
    const Rleaf = createLeaf(tree)
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
            return tree
        }]
    ])({ leaf, tree })
}
const checkBlocksUsage = (leaf, tree) => {
    if (leaf.blocks.length === tree.leafMax)
        return rotateLeaf(leaf, tree)
    else
        return tree
}
const put = tree => (key, value) => ifElse(
    hasPath(['tree', 'storeRef', key]),
    ({ tree }) => tree.storeRef[key] = value,//replace
    ({ tree, key, value }) => { //insert
        tree.size++
        tree.storeRef[key] = {
            key,
            value
        }
        tree.leafs[0].blocks.push(tree.storeRef[key])
        tree.leafs[0].blocks.sort((a, b) => {
            if (a.key > b.key) {
                return 1;
            }
            if (a.key < b.key) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })
        return checkBlocksUsage(tree.leafs[0], tree)
    }
)({ tree, key, value })

const main = ({ noneLeafMax = 3, leafMax = 3 }) => {
    let tree = initTree
    return {
        put: (key, value) => {
            return put(tree)(key, value)
        },
        getTree: tree
    }



}

export default main 