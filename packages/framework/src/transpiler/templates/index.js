const templateMicroservice = require('./microservice')

const buildTemplate = (typeTemplate, rootPath) => {
    switch (typeTemplate) {
        case 'microservice':
            templateMicroservice(rootPath)
            break;
    }
}
module.exports = buildTemplate