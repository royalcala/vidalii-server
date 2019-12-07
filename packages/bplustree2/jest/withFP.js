import btree from '../src'


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
const insertData = (size, listComparatorLeafsBlocks, checkLeafsBlocks, listComparatorParentsLeafs, checkParentLeafs) => {
    const tree = btree({})
    const t = tree.getTree
    for (let i = 0; i < size; i++) {
        tree.put(i, i)
    }
    let inputs = 0
    listComparatorLeafsBlocks.forEach(blocks => {
        blocks.forEach(b => {
            inputs++
        })
    })
    test('correct inputs by user', () => {
        expect(
            t.size
        ).toBe(
            inputs
        )
    })


    test('total size', () => {
        expect(
            t.size
        ).toBe(
            size
        )
    })
    checkLeafsBlocks(listComparatorLeafsBlocks)(t.leafs)
    checkParentLeafs(listComparatorParentsLeafs)(t.leafs)
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

        //     )
        // })


        describe('sizeN', () => {
            let data = 7
            //    console.log(' dinamicArray(data)::', dinamicArray(data))
            insertData(data,
                dinamicArray(data),
                checkLeafsBlocks,
                [1, 1, 3, 3, 5, 5],
                checkParentLeafs,

            )
        })

        // describe('sizeN', () => {
        //     let data = 5
        //    console.log(' dinamicArray(data)::', dinamicArray(data))
        //     insertData(data,
        //         dinamicArray(data),
        //         checkLeafsBlocks,
        //         [1, 1, 3, 3],
        //         checkParentLeafs,

        //     )
        // })
        //dynamic check parents leaf
        //1-2
        //[[null]]
        //3
        //[[2],[2]]




    })

}
