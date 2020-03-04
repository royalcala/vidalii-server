const fs = require('fs-extra')
const templateMicroservice = require('./microservice')
const buildTemplate = (typeTemplate, rootPath) => {
    if (fs.existsSync(rootPath + '/src'))
        console.log(
            `***Error. You first must to backup the dir:${rootPath}/src and delete***`
        )
    else
        switch (typeTemplate) {
            case 'microservice':
                templateMicroservice(rootPath)
                break;
        }

}
module.exports = buildTemplate