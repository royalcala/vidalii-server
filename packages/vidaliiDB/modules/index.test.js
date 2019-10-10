const fs = require('fs')
const R = require('ramda')
// const readModules = require('./readModules')
// const readComponets = require('./readComponents')



const readNodes = require('./readInstalled.test.js')
// const processLayer = require('./processLayer')

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


    test('get a function vidaliiPipe', async () => {
        expect(result).toEqual(
            expect.any(Function)
        );
    })




    //test results
    describe('installedFxs', () => {

        var methodes = result({ pathToInputs })

        test('resulted of vidaliiPipe({ pathToInputs }) matched with fxs.test.json', async () => {
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
}