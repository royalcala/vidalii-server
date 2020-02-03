const { gql } = require('apollo-server-fastify')
const fs = require('fs-extra')
const Glob = require("glob")
const Store = () => {
    let store = ''

    return {
        add: graphqlFile => {
            store = store.concat(graphqlFile)
            return 'store added'
        },
        get: (format = 'gql') => {
            switch (format) {
                case 'gql':
                    return gql(store)
                    break;
                case 'sdl':
                default:
                    return store
                    break;
            }
        },
        // outPutFile: async (pathFile, nameFile) => {
        //     try {
        //         await fs.outputFile(`${pathFile}/${nameFile}`, store)

        //         // const data = await fs.readFile(f, 'utf8')

        //         // console.log(data) // => hello!
        //     } catch (err) {
        //         console.error(err)
        //     }

        // }
    }
}
const instance = Store()
// require("glob").sync('src/typeDefs/*(Connection|Schema|Field).graphql')
// require("glob").sync(__dirname + 'src/typeDefs/*.mutation.*')
Glob.sync('src/sdl/*.graphql')
    .forEach(path => {
        instance.add(
            fs.readFileSync(path, 'utf8').toString()
        )
    });
Glob.sync('src/directives/*.js')
    .forEach(path => {
        // console.log(path)
        // console.log(require('../../' + path))
        // let directive = require('../../' + path).sdl
        instance.add(
            require('../../' + path).sdl
            + `\n`)
    })
Glob.sync('src/scalars/*.js')
    .forEach(path => {
        instance.add(
            require('../../' + path).sdl
            + `\n`)
    })

export default instance