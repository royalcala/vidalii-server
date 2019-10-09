const R = require('ramda')
const modelsTypes = require('./readInstalled')(__dirname + '/' + 'installedModelsTypes')

module.exports = ({ databases }) => {
    // const init = initialization({ databases })

    const init = R.pipe(
        R.toPairs,
        R.map(
            ([nameModelType, fxModelType]) => ({
                [nameModelType]: fxModelType({ databases })
            })
        ),
        R.mergeAll
    )(modelsTypes)
    
    // return init

    return init.simple
}