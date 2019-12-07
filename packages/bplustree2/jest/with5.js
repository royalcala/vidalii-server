import btree from '../src'

export default () => {
    describe('test with 5 put', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(30, 'hola')
        tree.put(20, 'hola')
        tree.put(40, 'hola')
        // console.log(' tree.getTree::', tree.getTree)
        const t = tree.getTree
        test('total', () => {
            expect(
                t.size
            ).toBe(5)
        })
        let firstNL = t.noneLeafs.toBlocks
        test('noneleaf.key', () => {
            expect(
                firstNL.storeRef.key
            ).toBe(20)
        })
        test('noneleaf.nextBlock.key', () => {
            expect(
                t.noneLeafs.toBlocks.nextBlock
            ).toBe(null)
        })
        let firstNL_LChild = firstNL.LChild.toBlocks
        test('firstNL_LChild.storeRef.key', () => {
            expect(
                firstNL_LChild.storeRef.key
            ).toBe(10)
        })
        let firstNL_LChild_LChild = firstNL_LChild.LChild.toBlocks
        test('firstNL_LChild_LChild.storeRef.key', () => {
            expect(
                firstNL_LChild_LChild.storeRef.key
            ).toBe(1)
        })

        let firstNL_LChild_RChild = firstNL_LChild.RChild.toBlocks
        test('firstNL_LChild_RChild.storeRef.key', () => {
            expect(
                firstNL_LChild_RChild.storeRef.key
            ).toBe(10)
        })


        let firstNL_RChild = firstNL.RChild.toBlocks
        test('firstNL_RChild.storeRef.key', () => {
            expect(
                firstNL_RChild.storeRef.key
            ).toBe(30)
        })


        let firstNL_RChild_RChild = firstNL_RChild.RChild.toBlocks
        test('firstNL_RChild_RChild.storeRef.key', () => {
            expect(
                firstNL_RChild_RChild.storeRef.key
            ).toBe(30)
        })

        let firstNL_RChild_RChild_nextBlock = firstNL_RChild.RChild.toBlocks.nextBlock
        test('firstNL_RChild_RChild.nextBlock.storeRef.key', () => {
            expect(
                firstNL_RChild_RChild_nextBlock.storeRef.key
            ).toBe(40)
        })

        let firstNL_RChild_LChild = firstNL_RChild.LChild.toBlocks
        test('firstNL_RChild_LChild.storeRef.key', () => {
            expect(
                firstNL_RChild_LChild.storeRef.key
            ).toBe(20)
        })


        // test('leaf.key ', () => {
        //     expect(
        //         t.leafs.toBlocks.storeRef.key
        //     ).toBe(1)
        // })

        // test('leaf.nextLeaf.key ', () => {
        //     expect(
        //         t.leafs.nextLeaf.toBlocks.storeRef.key
        //     ).toBe(10)
        // })

        // test('leaf.nextLeaf.nextLeaf.key ', () => {
        //     expect(
        //         t.leafs.nextLeaf.nextLeaf.toBlocks.storeRef.key
        //     ).toBe(20)
        // })

        // test('leaf.nextLeaf.nextLeaf.nextBlock.key ', () => {
        //     expect(
        //         t.leafs.nextLeaf.nextLeaf.toBlocks.nextBlock.storeRef.key
        //     ).toBe(30)
        // })

        // test('size leafs', async () => {
        //     let sizeLeafs = 0
        //     const iterate = leaf => {
        //         sizeLeafs++
        //         if (leaf.nextLeaf !== null)
        //             iterate(leaf.nextLeaf)
        //     }
        //     iterate(t.leafs)
        //     expect(
        //         sizeLeafs
        //     ).toBe(3)

        // })

        // test('check order min to max of Leafs.blocks', async () => {
        //     let ite = 0
        //     const iterate = leaf => {
        //         ite++

        //         let node = leaf.toBlocks
        //         // console.log('node::', node.storeRef.key)
        //         while (node.nextBlock !== null) {
        //             expect(
        //                 node.storeRef.key
        //             ).toBeLessThan(node.nextBlock.storeRef.key)
        //             node = node.nextBlock
        //         }
        //         if (leaf.nextLeaf !== null)
        //             iterate(leaf.nextLeaf)

        //     }

        //     iterate(t.leafs)
        //     // console.log('ite::', ite)
        // })




    })

}
