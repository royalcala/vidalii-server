const fs = require('fs-extra')
const extractDirectivesArgs = directives => {
    const store = {}
    Object.keys(directives).forEach(nameDirective => {
        console.log('%cnameDirective', 'color: #00bf00', nameDirective);
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

    console.log('%cStore:', 'color: #ffa640', store);

}

export default extractDirectivesArgs