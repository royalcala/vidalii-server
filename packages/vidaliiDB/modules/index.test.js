const fs = require('fs')
const R = require('ramda')
const readNodes = require('./readInstalled.test.js')
const configFxs = require('./fxs.test.json')
const vidaliiPipe = require('./vidaliiPipe.test')

module.exports = ({ pathToInputs }) => {

    test('Exist the path in pathToInputs', async () => {
        expect(fs.existsSync(pathToInputs)).toEqual(true)
    })
    const nodes = readNodes({
        pathToNodes: __dirname + '/installedFxs'
    })

    test('Exist the fxs in fxs.test.json', async () => {
        expect(
            Object.keys(nodes)
        ).toEqual(
            expect.arrayContaining(
                configFxs.processOrder
            )
        )
    })

    const result = vidaliiPipe({
        configFxs,
        fxs: nodes
    })


    test('get a function in vidaliiPipe', async () => {
        expect(result).toEqual(
            expect.any(Function)
        );
    })

    var methodes = result({ pathToInputs })

    describe('installedFxs', () => {
        //test in result all the installedFxs
        test('Match of vidaliiPipe({ pathToInputs }) with fxs.test.json', async () => {
            expect(
                Object.keys(methodes)
            ).toEqual(
                expect.arrayContaining(
                    [
                        'pathToInputs',
                        ...configFxs.processOrder
                    ]
                    //     [
                    //     'pathToInputs',
                    //     'input',
                    //     'schemas',
                    //     'validation',
                    //     'databases',
                    //     'databases_models',
                    //     'databases_models_shards',
                    // ]
                )
            );
        })

    })
    return methodes
}