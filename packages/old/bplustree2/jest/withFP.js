import btree from '../src'

const checkDownTree = listComparator => startNode => {
    listComparator.forEach(NestedList => {
        let firstBlock = startNode.toBlocks
        let leafDown = 0
        NestedList.forEach(([side, expectedKey]) => {
            let leaf
            if (side === 'L')
                leaf = firstBlock.LChild
            else if (side === 'R')
                leaf = firstBlock.RChild
            else if (side === 'RR') {
                leaf = firstBlock.nextBlock.RChild
            }

            let firstKey = leaf.toBlocks.storeRef.key
            test(`level${leafDown}->downTo->${side}->key:${firstKey}===${expectedKey}`, () => {
                expect(expectedKey).toBe(firstKey)
            })
            firstBlock = leaf.toBlocks
            leafDown++
        })
    })
}
const checkParentLeafs = listComparator => startNode => {
    let nodeLeaf = startNode
    let leafNum = 0
    listComparator.forEach(expectedKey => {
        let parentKey = nodeLeaf.parentNoneLeafBlock ? nodeLeaf.parentNoneLeafBlock.storeRef.key : null
        test(`leaf${leafNum}->parentNoneLeafBlock.key:${parentKey}`, () => {
            expect(expectedKey).toBe(parentKey)
        })
        leafNum++
        nodeLeaf = nodeLeaf.nextLeaf
    })

}

const checkLeafsBlocks = listComparator => startNode => {
    let nodeLeaf = startNode
    let nodeBlock = startNode.toBlocks
    let blocksTotal = 0

    listComparator.forEach(blocks => {
        let backBlock = nodeBlock.backBlock
        // console.log('nodeBlock::', nodeBlock)
        // console.log('backBlock::', backBlock)
        test(`first block.backBlock of leaf equals null?`, () => {
            expect(backBlock).toBe(null)
        })
        blocks.forEach(key => {
            blocksTotal++
            let blockKey = nodeBlock.storeRef.key
            test(`key:${key}=blockKey:${blockKey}`, () => {
                expect(key).toBe(blockKey)
            })
            nodeBlock = nodeBlock.nextBlock
        })
        test(`last block.nextBlock of leaf equals null?`, () => {
            expect(nodeBlock).toBe(null)
        })
        if (nodeLeaf.nextLeaf) {
            nodeLeaf = nodeLeaf.nextLeaf
            nodeBlock = nodeLeaf.toBlocks
        }
    })
    return blocksTotal
}
const insertData = (size,
    listComparatorLeafsBlocks, checkLeafsBlocks,
    listComparatorParentsLeafs, checkParentLeafs,
    listComparatorDownTree, checkDownTree) => {
    const tree = btree({})
    const t = tree.getTree
    // for (let i = 0; i < size; i++) {
    //     tree.put(i, i)
    // }
    // let inputs = 0
    // listComparatorLeafsBlocks.forEach(blocks => {
    //     blocks.forEach(b => {
    //         inputs++
    //     })
    // })
    // test('correct inputs by user', () => {
    //     expect(
    //         t.size
    //     ).toBe(
    //         inputs
    //     )
    // })


    test(`Insert And Total Size ${t.size}`, () => {
        for (let i = 0; i < size; i++) {
            tree.put(i, i)
        }
        expect(
            t.size
        ).toBe(
            size
        )
    })
    if (checkLeafsBlocks)
        checkLeafsBlocks(listComparatorLeafsBlocks)(t.leafs)
    if (checkParentLeafs)
        checkParentLeafs(listComparatorParentsLeafs)(t.leafs)
    if (checkDownTree)
        checkDownTree(listComparatorDownTree)((t.noneLeafs))
}

const dinamicArray = size => {
    let array = []
    let index = 0
    for (index; index < size - 2; index++) {
        array.push([index])
    }
    array.push([index++, index++])
    return array

}


export default () => {
    describe('test with 2 put', () => {


        // describe('size1', () => {
        //     insertData(1,
        //         [[0]],
        //         checkLeafsBlocks
        //     )
        // })

        // describe('size2', () => {
        //     insertData(2,
        //         [[0,1]],
        //         checkLeafsBlocks
        //     )
        // })

        // describe('size3', () => {
        //     insertData(3,
        //         [[0], [1, 2]],
        //         checkLeafsBlocks
        //     )
        // })

        // describe('size4', () => {
        //     insertData(4,
        //         [[0], [1], [2, 3]],
        //         checkLeafsBlocks
        //     )
        // })


        // describe('sizeN', () => {
        //     let data = 3
        //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1],
        //         checkParentLeafs,

        //     )
        // })

        // describe('sizeN', () => {
        //     let data = 4
        //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1,1,2],
        //         checkParentLeafs,

        //     )
        // })
        // describe('sizeN', () => {
        //     let data = 5
        // //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1, 1, 3, 3],
        //         checkParentLeafs,

        //     )
        // })

        // describe('sizeN', () => {
        //     let data = 6
        //     //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1, 1, 3, 3, 4],
        //         checkParentLeafs,
        //         [
        //             [['L', 1], ['L', 0]],
        //             [['L', 1], ['R', 1]],
        //             [['R', 3], ['L', 2]],
        //             [['R', 3], ['R', 3]],
        //             [['R', 3], ['RR', 4]],
        //         ],
        //         checkDownTree
        //     )
        // })


        // describe('sizeN', () => {
        //     let data = 1000
        //     //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1, 1, 3, 3, 5, 5],
        //         checkParentLeafs,
        //         [
        //             [['L', 1], ['L', 0]],
        //             [['L', 1], ['R', 1]],
        //             [['R', 3], ['L', 2]],
        //             [['R', 3], ['R', 3]],
        //             [['RR', 5], ['L', 4]],
        //             [['RR', 5], ['R', 5]],
        //         ],
        //         checkDownTree
        //     )
        // })



        // describe('sizeN', () => {
        //     let data = 100
        //     //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //     )
        // })






    })

}
