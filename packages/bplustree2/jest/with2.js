import btree from '../src'

export default () => {
    describe('test with 2 put', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        // tree.put(1, 'hola')
        // tree.put(20, 'hola')
        // console.log(' tree.getTree::', tree.getTree)
        const t = tree.getTree
        test('total', () => {
            expect(
                t.size
            ).toBe(2)
        })

        test('leaf.key ', () => {
            expect(
                t.leafs.toBlocks.storeRef.key
            ).toBe(1)
        })

        test('leaf.next.key ', () => {
            expect(
                t.leafs.toBlocks.nextBlock.storeRef.key
            ).toBe(10)
        })

        test('leaf.parentNoneLeafBlock ', () => {
            expect(
                t.leafs.parentNoneLeafBlock
            ).toBe(null)
        })
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
