const fs = require('fs-extra')
export const fetchDirectives = (pathDir, directivesExtracted) => {
    directivesExtracted.forEach(
        ([nameDirective, args]) => {
            //copy file or fetch from the cloud   
            const nameFile = `directive.${nameDirective}.js`
            fs.copySync(
                `${fs.realpathSync('src/cloud')}/${nameFile}`,//from
                `${pathDir}/${nameFile}` //to
            )
        });
}

export const fetchImportsLib = (pathDir, importsExtracted) => {
    //@vidalii/lib.model.file -> to cloud/lib.model.file
    const isLib = /^lib./;
    Object.keys(importsExtracted).forEach(
        nameFile => {
            // console.log('%cNameFile:', 'color: #006dcc', nameFile);
            if (isLib.test(nameFile))
                try {
                    fs.copySync(
                        `${fs.realpathSync('src/cloud')}/${nameFile}.js`, //from
                        `${pathDir}/${nameFile}.js` //to
                    )
                } catch (error) {
                    console.log('Error in fetchImportsLib', error)
                }


        });
}

export const downloadImportsNpm = () => {
    //@vidalii/npm.namepackage -> to node_modules
}