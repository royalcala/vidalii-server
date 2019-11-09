import { compose, cond, equals, reduce, assoc, toPairs, toLower } from 'ramda'
import typedb_inStorage from './typesDb/inStorage'
import typedb_inMemory from './typesDb/inMemory'

// const condTables = args => cond([
//     type_inStorage,
//     type_inMemory
// ])(args)

// const createTables = args => reduce(
//     (acc, [tableName, tableConfig]) =>
//         assoc
//             (
//                 tableName,
//                 condTables({ tableName, tableConfig }),
//                 acc
//             ),
//     {}
// )(toPairs(args.config.tables))

// export default ({ config }) => {
//     var tables = createTables({ config })
//     // console.log('tables::', tables)
//     return tables
// }


const reduce_tables_assoc = globalData => assoc_cond =>
    reduce(
        assoc_cond,
        {}
    )(toPairs(globalData.config.tables))

const assoc_cond = cond_typedb => (acc, [tableName, tableConfig]) =>
    assoc
        (
            tableName,
            cond_typedb({ tableName, tableConfig }),
            acc
        )

const cond_typedb = () => assoc_cond_args => cond([
    typedb_inStorage,
    typedb_inMemory
])(assoc_cond_args)
// const cond_typedb = () => async ({ tableName, tableConfig }) => {
//     // https://v8.dev/features/dynamic-import
//     toLower(tableConfig.typeDb)
//     // const moduleSpecifier = './utils.mjs';
//     const moduleSpecifier = toLower('./' + tableConfig.typeDb + '.js')
//     console.log('moduleSpecifier::', moduleSpecifier)
//     const module = await import('./typesDb/inStorage')
//     console.log('module::', module)
//     return module.default
//     // module.default();
//     // → logs 'Hi from the default export!'
//     // module.doStuff();
//     // → logs 'Doing stuff…'

// }



// const moduleSpecifier = './utils.mjs';
// import(moduleSpecifier)
//   .then((module) => {
//     module.default();
//     // → logs 'Hi from the default export!'
//     module.doStuff();
//     // → logs 'Doing stuff…'
//   });

export default globalData => compose(
    reduce_tables_assoc(globalData),
    assoc_cond,
    cond_typedb,
)({})