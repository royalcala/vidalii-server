import noneLeaf from './noneLeaf'
import leaf from './leaf'
import { initTree } from './initTree'

import { put } from './put'
// https://www.npmjs.com/package/sbtree //check later

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