import btree from '../src'

export default () => {
    describe('test with 4 put', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(30, 'hola')
        tree.put(20, 'hola')
        // console.log(' tree.getTree::', tree.getTree)
        const t = tree.getTree
        test('total', () => {
            expect(
                t.size
            ).toBe(4)
        })

        test('noneleaf.key', () => {
            expect(
                t.noneLeafs.toBlocks.storeRef.key
            ).toBe(10)
        })

        test('noneleaf.nextBlock.key', () => {
            expect(
                t.noneLeafs.toBlocks.nextBlock.storeRef.key
            ).toBe(20)
        })

        test('leaf.key ', () => {
            expect(
                t.leafs.toBlocks.storeRef.key
            ).toBe(1)
        })

        test('t.leafs.parentNoneLeafBlock.storeRef.key', () => {
            expect(
                t.leafs.parentNoneLeafBlock.storeRef.key
            ).toBe(10)
        })


        test('leaf.nextLeaf.key ', () => {
            expect(
                t.leafs.nextLeaf.toBlocks.storeRef.key
            ).toBe(10)
        })

        test(' t.leafs.nextLeaf.parentNoneLeafBlock.storeRef.key ', () => {
            expect(
                t.leafs.nextLeaf.parentNoneLeafBlock.storeRef.key
            ).toBe(10)
        })

        test('leaf.nextLeaf.nextLeaf.key ', () => {
            expect(
                t.leafs.nextLeaf.nextLeaf.toBlocks.storeRef.key
            ).toBe(20)
        })

        test(' t.leafs.nextLeaf.nextLeaf.parentNoneLeafBlock.storeRef.key', () => {
            expect(
                t.leafs.nextLeaf.nextLeaf.parentNoneLeafBlock.storeRef.key
            ).toBe(20)
        })

        test('leaf.nextLeaf.nextLeaf.nextBlock.key ', () => {
            expect(
                t.leafs.nextLeaf.nextLeaf.toBlocks.nextBlock.storeRef.key
            ).toBe(30)
        })

        test('size leafs', async () => {
            let sizeLeafs = 0
            const iterate = leaf => {
                sizeLeafs++
                if (leaf.nextLeaf !== null)
                    iterate(leaf.nextLeaf)
            }
            iterate(t.leafs)
            expect(
                sizeLeafs
            ).toBe(3)

        })

        test('check order min to max of Leafs.blocks', async () => {
            let ite = 0
            const iterate = leaf => {
                // new Promise((resolve, reject) => {
                ite++

                let node = leaf.toBlocks
                // console.log('node::', node.storeRef.key)
                while (node.nextBlock !== null) {
                    expect(
                        node.storeRef.key
                    ).toBeLessThan(node.nextBlock.storeRef.key)
                    node = node.nextBlock
                }
                // resolve()
                // console.log('leaf.nextLeaf::',leaf.nextLeaf)
                if (leaf.nextLeaf !== null)
                    iterate(leaf.nextLeaf)

            }
            // )
            // .then(x => {
            //     // console.log(x.next !== null)
            //     if (x.next !== null) {
            //         return iterate(leaf + 1)
            //     }
            // })
            iterate(t.leafs)
            // console.log('ite::', ite)
        })






    })

}
