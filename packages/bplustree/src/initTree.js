export const initTree = {
    size: 0,
    countIdLeaf: 0,
    noneLeafMax: 3,
    leafMax: 3,
    // first: 0,
    // last: null,
    noneLeafs: null,
    // noneLeafs: {
    //     memory: [],
    //     parent: null,
    //     arrayPointers: {
    //         p0: '',
    //         p1: ''
    //     },
    //     type: 'noneleaf'
    // }
    leafs: {
        0: {
            memory: [],
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