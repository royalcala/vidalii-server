module.exports = {
    afterExtract: (map = []) => {
        map.forEach(modelName => {
            console.log('%cmodelName:', 'color: #aa00ff', modelName);
            ///download gql.dirArg
            //gql.dirArg
            //after download all models download schemas
        });
    }
}