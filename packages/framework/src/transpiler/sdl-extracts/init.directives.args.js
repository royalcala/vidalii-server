const fs = require('fs-extra')
const extractDirectivesArgs = directives => {
    const store = {}
    Object.keys(directives).forEach(nameDirective => {        
        try {
            // '@cloud/' + 'gql.dirArg.' + 'model'
            // "@cloud/gql.dirArg.model"
            //`@cloud/gql.dirArg.model`
            const path = fs.realpathSync('src/cloud')
            const obj = require(`${path}/gql.dirArg.${nameDirective}`)
            store[nameDirective] = {}
        } catch (error) {
            // console.log('%cError:', 'color: #917399', error);

        }
    });
    return store
}

export default extractDirectivesArgs