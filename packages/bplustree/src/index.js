import noneLeaf from './noneLeaf'
import leaf from './leaf'
import { initTree } from './initTree'
import { defaultComparatorFx } from './tree'
import { put } from './put'
// https://www.npmjs.com/package/sbtree //check later


const defaultsTree = () => {

}

const main = ({ noneLeafMax = 3, leafMax = 3, comparatorSortFx = defaultComparatorFx }) => {
    initTree.comparatorSortFx = comparatorSortFx
    let tree = initTree
    return {
        put: (key, value) => {
            return put(tree)(key, value)
        },
        getTree: tree
    }



}

export default main 