import { resolvePlugin } from "@babel/core";

export default () => {
    describe('knex', () => {
        let knex
        let sampleSize
        beforeAll(async () => {
            sampleSize = global.sampleSize
            knex = global.knex
        });

        it('create Table', async () => {

            const table = table => {
                table.increments('the_id')
                table.integer('folio')
                table.string('spec')
                table.index('folio')
                table.index('spec')
            }
            let response = await knex.schema.createTable(
                'table1',
                table
            )

            let str = knex.schema.createTable(
                'table1',
                table
            ).toString()
            console.log('str::', str)
        })

        it('insert many works only with <500 ', async () => {
            let rows = []
            for (let index = 0; (index < sampleSize && index < 499); index++) {
                rows.push({
                    folio: index,
                    spec: 'car number ' + index
                })
            }
            console.log('before inserted')
            const trx = await knex.transaction()
            expect(trx.isCompleted()).toBe(false)
            let inserted = await trx
                .insert(rows).into('table1')
            // console.log('inserted::', inserted)            

            await trx.commit();

            // expect(true).toBe(inserted[0]<500)
            expect(trx.isCompleted()).toBe(true)
        })

        it('insert many works only with >500 ', async () => {
            let rows = []
            for (let index = 0; index < sampleSize; index++) {
                rows.push({
                    folio: index,
                    spec: 'car number ' + index
                })
            }

            console.log('before inserted')
            const trx = await knex.transaction();
            while (rows.length) {
                // console.log(rows.splice(0, 2));
                // console.log('rows::', rows)
                let inserted = await trx.insert(rows.splice(0, 499)).into('table1')
                // console.log('inserted::', inserted)
            }
            // console.log('trx.isCompleted()::', trx.isCompleted())
            expect(trx.isCompleted()).toBe(false)
            // let query = trx.insert(rows).into('table1').toString()
            // console.log('query::', query)
            // let inserted = await trx
            //     .raw(query)
            // // console.log('inserted::', inserted)
            // let inserted = await trx
            // .insert(rows).into('table1')
            // console.log('inserted::', inserted)            


            // console.log('trx::',trx.batchInsert)
            // let inserted = await new Promise(
            //     (resolve, reject) => {
            //         knex.batchInsert('table1', rows, 101)
            //             .transacting(trx)
            //             .then(
            //                 (a) => {
            //                     console.log('a::', a)
            //                     resolve()
            //                 }
            //             )
            //             .catch(
            //                 (e) => {
            //                     console.log('e::', e)
            //                 }
            //             )
            //     }
            // )
            // let inserted = await trx.batchInsert('table1', rows, 101)
            // // console.log('trx::',trx.batchInsert)
            // console.log('inserted::', inserted)
            // let objs = await trx.select('*').from('table1')
            // console.log('objs::', objs)

            await trx.commit();

            // expect(true).toBe(inserted[0]<500)
            // expect(sampleSize).toBe(objs.length)
            expect(trx.isCompleted()).toBe(true)
        })

        it('read ALL', async () => {
            const trx = await knex.transaction();
            let objs = await trx.select('*').from('table1')
            console.log('objs::', objs.length)
            expect(true).toBe(true)
        })

    })//end description



}