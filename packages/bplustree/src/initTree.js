export const initTree = {
    size: 0,
    countIdLeaf: 0,
    countIdNoneLeaf: 0,
    noneLeafMax: 3,
    leafMax: 3,
    // first: 0,
    // last: null,
    noneLeafs: {},
    // noneLeafs: {
    //     blocks: [],
    //     parent: null,
    //     arrayPointers: {
    //         p0: '',
    //         p1: ''
    //     },
    //     type: 'noneleaf'
    // }
    leafs: {
        0: {
            blocks: [],
            parent: null,
            next: null,
            back: null,
            type: 'leaf'
        }
    },
    storeRef: {
        // key: {
        // key,
        // value
    }
}