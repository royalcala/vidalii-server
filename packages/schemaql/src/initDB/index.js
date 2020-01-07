// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }
const initColumn = async ({ db, tableName, column }) => {
    let existsColumn = await db.schema.hasColumn(tableName, column)
    if (!existsColumn) {
        knex.schema.table('users', function (table) {
            table.dropColumn('name');
            table.string('first_name');
            table.string('last_name');
          })
    } else {

    }

}



const initTable = async ({ db, tableName, schema, type }) => {
    let existTable = await db.schema.hasTable(tableName)
    if (!existTable) {
        let response
        if (type === 'main') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.uuid('_id').primary()
                }
            )
        } else if (type === 'extended') {
            response = await db.schema.createTable(
                tableName,
                table => {
                    table.increments()
                    table.uuid('ext_id').index()
                }
            )
        }
    } else {
        let key
        for (key in schema) {
            console.log(`schema.${key} = ${schema[key]}`)
            if (schema[key].hasOwnProperty('vidaliiLeaf')) {
                await initColumn({ db, tableName, column: schema[key] })
            } else if (typeof schema[key] === 'object') {
                await initTable({
                    db,
                    tableName: key,
                    schema: schema[key],
                    type: 'extended'
                })
            }
        }
    }
}

export default async ({ modelName, schema, db }) => {

    let response = await initTable({ db, modelName, schema, type: 'main' })
    // let exist = await db.schema.hasTable(modelName)
    // if (!exist) {
    //     let response = await db.schema.createTable(
    //         'table1',

    //         // table => {
    //         //     // let response = await resolveAfter2Seconds(3)
    //         //     table.string('_id').primary();
    //         //     table.string('first_name', 100);
    //         //     table.string('last_name', 100);
    //         // }
    //     )
    // }
    // const table = table => {
    //     table.increments('the_id')
    //     table.integer('folio')
    //     table.string('spec')
    //     table.index('folio')
    //     table.index('spec')
    // }
    // let response = await knex.schema.createTable(
    //     'table1',
    //     table
    // )
    // db.schema.hasTable(modelName).then(function (exists) {
    //     if (!exists) {

    //         return db.schema.createTable(modelName, function (table) {
    //             table.string('_id').primary();
    //             // schema
    //             table.string('first_name', 100);
    //             table.string('last_name', 100);
    //             table.text('bio');
    //         });
    //         resolve('not Exist')
    //     } else {
    //         resolve('Exist')
    //     }
    // });
}
