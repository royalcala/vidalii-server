import { ifElse, hasPath, cond, pathEq, pipe } from 'ramda'
import { incrementSizeTree, saveKeyValueInStore, moveToLeaf } from './tree'
import { createLeaf, selectLeaf, saveDataWithSelectLeaf } from './leaf'
import { checkRotateWithSelectLeaf } from './leafRotate'

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