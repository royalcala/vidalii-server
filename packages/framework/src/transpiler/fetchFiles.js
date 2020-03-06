const fs = require('fs-extra')
export const fetchDirectivesFiles = (pathDir, directivesExtracted) => {
    console.log('%cDirectives', 'color: #1d5673', directivesExtracted);
    directivesExtracted.forEach(
        ([nameDirective, args]) => {
            //copy file or fetch from the cloud   
            const nameFile = `directive.${nameDirective}.js`
            fs.copySync(
                `${fs.realpathSync('src/cloud')}/${nameFile}`,
                `${pathDir}/${nameFile}`
            )
        });
}

export const downloadImportsLib = () => {
    //@vidalii/lib.model.file -> to cloud/lib.model.file
}

export const downloadImportsNpm = () => {
    //@vidalii/npm.namepackage -> to node_modules
}