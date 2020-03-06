const fs = require('fs-extra')
const templateMicroservice = require('./microservice')
const templateCloud = require('./cloud')
const buildTemplate = ({ typeTemplate, rootPath, overwrite = false }) => {
    if (overwrite === false && fs.existsSync(rootPath + '/src'))
        console.log(
            `***Error. You first must to backup the dir:${rootPath}/src and delete***`
        )
    else
        switch (typeTemplate) {
            case 'microservice':
                templateMicroservice(rootPath)
                break;
            case 'cloud':
                templateCloud(rootPath)
        }

}
// module.exports = buildTemplate

export default buildTemplate