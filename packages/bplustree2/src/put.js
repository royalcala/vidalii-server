import { ifElse, hasPath, cond, pathEq, pipe } from 'ramda'
import { saveKeyValueInStore, moveToLeaf } from './tree'
import { checkRotate } from './leafRotate'
import * as leaf from './leaf'

// export const saveLeaf = pipe(saveKeyValueInStore, insertLeafBlock, checkRotateWithSelectLeaf)


export const put = tree => (key, value) => ifElse(
    hasPath(['tree', 'store', key]),
    ({ tree }) => {//replace
        tree.store[key] = value
        return tree
    },
    ({ tree, key, value }) => { //insert  
        let insert = cond([
            [({ tree }) => tree.size >= tree.leafMax, pipe(
                moveToLeaf({ node: tree.noneLeafs }),
                // state => saveLeaf({ ByRefNode: state.selectLeaf })(state)
            )],
            [({ tree }) => tree.size > 0, pipe(saveKeyValueInStore, leaf.createLeafBlock, leaf.insertRefStoreInBlock, leaf.selectFirstLeaf, leaf.insertBlockInLeaf, checkRotate)],
            [pathEq(['tree', 'size'], 0), pipe(saveKeyValueInStore, leaf.createLeafBlock, leaf.insertRefStoreInBlock, leaf.createLeaf, leaf.insertBlockInLeaf, leaf.insertLeafInTree)],
        ])({ tree, key, value })

        tree.size++
        return insert
    }
)({ tree, key, value })