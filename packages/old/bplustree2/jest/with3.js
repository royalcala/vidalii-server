import btree from '../src'

export default () => {
    describe('test with 3 put', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(30, 'hola')
        // tree.put(20, 'hola')
        // console.log(' tree.getTree::', tree.getTree)
        const t = tree.getTree
        test('total', () => {
            expect(
                t.size
            ).toBe(3)
        })
        

        test('leaf.key ', () => {
            expect(
                t.leafs.toBlocks.storeRef.key
            ).toBe(1)
        })

        test('leaf.parentNoneLeafBlock ', () => {
            expect(
                t.leafs.parentNoneLeafBlock.storeRef.key
            ).toBe(10)
        })
        test('leaf.nextBlock.key ', () => {
            expect(
                t.leafs.toBlocks.nextBlock
            ).toBe(null)
        })
        test('leaf.sizeBlocks ', () => {
            expect(
                t.leafs.sizeBlocks
            ).toBe(1)
        })

        test('Rleaf.sizeBlocks ', () => {
            expect(
                t.leafs.nextLeaf.sizeBlocks
            ).toBe(2)
        })

        test('Rleaf.key ', () => {
            expect(
                t.leafs.nextLeaf.toBlocks.storeRef.key
            ).toBe(10)
        })

        test('Rleaf.nextBlock.key ', () => {
            expect(
                t.leafs.nextLeaf.toBlocks.nextBlock.storeRef.key
            ).toBe(30)
        })


        test(' t.leafs.nextLeaf.parentNoneLeafBlock.storeRef.key', () => {
            expect(
                t.leafs.nextLeaf.parentNoneLeafBlock.storeRef.key
            ).toBe(10)
        })




        test('noneLeaf.sizeBlocks ', () => {
            expect(
                t.noneLeafs.sizeBlocks
            ).toBe(1)
        })

        test('noneLeaf.toBlocks.storeRef.key ', () => {
            expect(
                t.noneLeafs.toBlocks.storeRef.key
            ).toBe(10)
        })
        test('t.noneLeafs.toBlocks.nextBlock ', () => {
            expect(
                t.noneLeafs.toBlocks.nextBlock
            ).toBe(null)
        })

        test('t.noneLeafs.toBlocks.noneleaf ', () => {
            expect(
                t.noneLeafs.toBlocks.noneLeaf
            ).toBe(t.noneLeafs)
        })



    })

}
