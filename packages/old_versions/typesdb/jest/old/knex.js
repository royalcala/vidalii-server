import { removeDataBase } from '../../../removeDatabase'

export default () => {
    describe('knex', () => {
        let knex
        let sampleSize
        let location = __dirname + '/knex.sqlite'
        beforeAll(async () => {
            removeDataBase({ location })
            sampleSize = global.sampleSize

            knex = require('knex')({
                client: 'sqlite3',
                connection: {
                    filename: location
                },
                useNullAsDefault: true
            });
        });

        it('create Table', async () => {
            const table = table => {
                table.increments('the_id')
                table.integer('folio')
                table.string('spec')
                // table.index('folio')
                // table.index('spec')
            }
            let response = await knex.schema.createTable(
                'tableKnex',
                table
            )

            // let str = knex.schema.createTable(
            //     'tableKnex',
            //     table
            // ).toString()
            // console.log('str::', str)
        })
        // it('insert many works only with <500 with transaction ', async () => {
        //     let rows = []
        //     for (let index = 0; (index < sampleSize && index < 499); index++) {
        //         rows.push({
        //             // withError: '',
        //             folio: index,
        //             spec: 'car number ' + index
        //         })
        //     }
        //     const trx = await knex.transaction()
        //     expect(trx.isCompleted()).toBe(false)
        //     try {
        //         let inserted = await trx
        //             .insert(rows).into('tableKnex')
        //         // console.log('inserted::', inserted)
        //         await trx.commit();
        //     } catch (error) {
        //         await trx.rollback()
        //         // console.log('error::', error)
        //     }
        //     expect(trx.isCompleted()).toBe(true)
        // })

        // it('insert many works for more than >500 with await transaction ', async () => {
        //     let rows = []
        //     for (let index = 0; index < sampleSize; index++) {
        //         rows.push({
        //             folio: index,
        //             spec: 'car number ' + index
        //         })
        //     }
        //     const trx = await knex.transaction();
        //     while (rows.length) {
        //         let inserted = await trx.insert(rows.splice(0, 499)).into('tableKnex')
        //     }
        //     expect(trx.isCompleted()).toBe(false)


        //     await trx.commit();
        //     expect(trx.isCompleted()).toBe(true)
        // })
        it('insert many works for more than >500 with promise.All transaction ', async () => {
            let rows = []
            for (let index = 0; index < sampleSize; index++) {
                rows.push({
                    // withError: '',
                    folio: index,
                    spec: 'car number ' + index
                })
            }
            const trx = await knex.transaction();
            let promises = []

            while (rows.length) {
                promises.push(trx.insert(rows.splice(0, 499)).into('tableKnex'))
            }

            expect(trx.isCompleted()).toBe(false)
            try {
                await Promise.all(promises)
            } catch (error) {
                console.log('error::', error)
            }

            await trx.commit();
            expect(trx.isCompleted()).toBe(true)
        })

        // it('with raw ', async () => {
        //     const trx = await knex.transaction()

        //     expect(trx.isCompleted()).toBe(false)
        //     let query = trx.insert({ folio: 1, spec: 'inserted with raw' }).into('tableKnex').toString()            
        //     let response = await trx.raw(query)            
        //     // await Promise.all(queries)
        //     await trx.commit();

        //     expect(trx.isCompleted()).toBe(true)
        // })

        // TOO slow
        // it('insert many one by one transaction ', async () => {
        //     const trx = await knex.transaction()
        //     for (let index = 0; index < sampleSize; index++) {
        //         await trx.insert({ folio: index, spec: 'car number' + index }).into('tableKnex')
        //     }

        //     expect(trx.isCompleted()).toBe(false)


        //     await trx.commit();

        //     expect(trx.isCompleted()).toBe(true)
        // })
        //slow
        // it('insert many one by one transaction promise.all ', async () => {
        //     const trx = await knex.transaction()
        //     const queries = []
        //     for (let index = 0; index < sampleSize; index++) {
        //         let query = trx.insert({ folio: index, spec: 'car number' + index }).into('tableKnex')
        //         queries.push(query)
        //     }

        //     expect(trx.isCompleted()).toBe(false)

        //     await Promise.all(queries)
        //     await trx.commit();

        //     expect(trx.isCompleted()).toBe(true)
        // })

        it('read ALL', async () => {
            const trx = await knex.transaction();
            let objs = await trx.select('*').from('tableKnex')
            console.log('objs::', objs.length)
            expect(true).toBe(true)
        })

    })//end description



}