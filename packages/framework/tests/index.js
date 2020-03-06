import { buildDeveloperMode } from "../src/transpiler";

buildDeveloperMode({
    typeTemplate: 'cloud',
    rootPath: __dirname + '/generated/g1',
    overwrite: true,
    sdls: [
        __dirname + "/proyect1/*.graphql"
    ]
})