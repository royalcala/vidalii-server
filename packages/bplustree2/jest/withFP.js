import btree from '../src'

// const checkLeafs = (startNode, listComparator) => {

//     listComparator.forEach(blocks => {
//         let nodeBlock = startNode.toBlocks
//         blocks.forEach(key => {
//             expect(key).toBe(nodeBlock.storeRef.key)
//             nodeBlock = nodeBlock.nextBlock
//         })
//     })
// }

const checkLeafs = listComparator => startNode => {
    let nodeLeaf = startNode
    let nodeBlock = startNode.toBlocks
    let blocksTotal = 0
    // test.each([
    //     [1, 1, 2],
    //     [1, 2, 3],
    //     [2, 1, 3],
    //   ])('.add(%i, %i)', (a, b, expected) => {
    //     expect(a + b).toBe(expected);
    //   });
    listComparator.forEach(blocks => {
        let backBlock = nodeBlock.backBlock
        console.log('nodeBlock::', nodeBlock)
        console.log('backBlock::', backBlock)
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
const insertData = (size, listComparator, checkLeaf) => {
    const tree = btree({})
    const t = tree.getTree
    for (let i = 0; i < size; i++) {
        tree.put(i, i)
    }
    let inputs = 0
    listComparator.forEach(blocks => {
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
    checkLeaf(listComparator)(t.leafs)



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
        //         checkLeafs
        //     )
        // })

        // describe('size2', () => {
        //     insertData(2,
        //         [[0,1]],
        //         checkLeafs
        //     )
        // })

        // describe('size3', () => {
        //     insertData(3,
        //         [[0], [1, 2]],
        //         checkLeafs
        //     )
        // })

        // describe('size4', () => {
        //     insertData(4,
        //         [[0], [1], [2, 3]],
        //         checkLeafs
        //     )
        // })

        //doesnt work on doble rotation on noneleaf
        describe('sizeN', () => {
            let data = 7
            insertData(data,
                dinamicArray(data),
                checkLeafs
            )
        })



        // test('leaf.key ', () => {
        //     expect(
        //         t.leafs.toBlocks.storeRef.key
        //     ).toBe(1)
        // })

        // test('leaf.next.key ', () => {
        //     expect(
        //         t.leafs.toBlocks.nextBlock.storeRef.key
        //     ).toBe(10)
        // })

        // test('leaf.parentNoneLeafBlock ', () => {
        //     expect(
        //         t.leafs.parentNoneLeafBlock
        //     ).toBe(null)
        // })
        // test('total first noneleaf blocks first block', () => {
        //     expect(
        //         tree.getTree.noneLeafs[0].blocks.length
        //     ).toBe(1)
        // })

        // test('key of first none leaf', () => {
        //     expect(
        //         tree.getTree.noneLeafs[0].blocks[0].key
        //     ).toBe(2)
        // })

        // test('total of leafs', () => {
        //     expect(
        //         Object.entries(tree.getTree.leafs).length
        //     ).toBe(2)
        // })


    })

}
