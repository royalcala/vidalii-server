import noneLeaf from './noneLeaf'
import leaf from './leaf'
import { initTree } from './initTree'
import { cond, pathEq, ifElse, hasPath } from 'ramda'

const createNoneLeaf = (leaftLeaf, rightLeaf) => {
    let newNoneLeaf = {}

}

const createLeaf = tree => {
    tree.countIdLeaf++
    let nameNewLeaf = tree.countIdLeaf
    tree.leafs[nameNewLeaf] = {
        memory: [],
        parent: null,
        next: null,
        back: null,
        type: 'leaf'
    }
    return tree.leafs[nameNewLeaf]
}
const divideLeaf = (leaf, tree) => {
    const newLeaf = createLeaf(tree)
    leaf.next = newLeaf
    newLeaf.back = leaf
    let distribution = tree.leafMax / 2
    newLeaf.memory = leaf.memory.slice(-Math.ceil(
        distribution
    ))
    leaf.memory.splice(-Math.ceil(-Math.floor(distribution)))
    return newLeaf
}
const rotateLeaf = (leaf, tree) => {
    cond([
        [pathEq(['leaf', 'parent'], null), ({ leaf, tree }) => {
            const newLeaf = divideLeaf(leaf, tree)
            return tree
        }]
    ])({ leaf, tree })
}
const checkMemoryUsage = (leaf, tree) => {
    if (leaf.memory.length === tree.leafMax)
        return rotateLeaf(leaf, tree)
    else
        return tree
}
const put = tree => (key, value) => cond([
    //case noneLeafs === null
    [pathEq(['tree', 'noneLeafs'], null), ifElse(
        hasPath(['tree', 'storeRef', key]),
        ({ tree }) => tree.storeRef[key] = value,//replace
        ({ tree, key, value }) => { //insert
            tree.storeRef[key] = {
                key,
                value
            }
            tree.leafs[0].memory.push(tree.storeRef[key])
            tree.leafs[0].memory.sort((a, b) => {
                if (a.key > b.key) {
                    return 1;
                }
                if (a.key < b.key) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            })
            return checkMemoryUsage(tree.leafs[0], tree)
        }
    ),
    ]
])({ tree, key, value })

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