

export default () => {
    describe('knex', () => {
        let knex
        let sampleSize
        beforeAll(async () => {
            sampleSize = global.sampleSize
            knex = global.db
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
                'tableKnex',
                table
            )

            let str = knex.schema.createTable(
                'tableKnex',
                table
            ).toString()
            console.log('str::', str)
        })
        it('insert many works only with <500 with transaction ', async () => {
            let rows = []
            for (let index = 0; (index < sampleSize && index < 499); index++) {
                rows.push({
                    folio: index,
                    spec: 'car number ' + index
                })
            }
            const trx = await knex.transaction()
            expect(trx.isCompleted()).toBe(false)
            let inserted = await trx
                .insert(rows).into('tableKnex')
            // console.log('inserted::', inserted)            

            await trx.commit();

            // expect(true).toBe(inserted[0]<500)
            expect(trx.isCompleted()).toBe(true)
        })

        // it('insert many works for more than >500 with transaction ', async () => {
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
        //dont work for many, insted of this, use, raw sentences
        it('insert many one by one transaction promise.all ', async () => {
            const trx = await knex.transaction()
            const queries = []
            for (let index = 0; index < sampleSize; index++) {
                let query = trx.insert({ folio: index, spec: 'car number' + index }).into('tableKnex')
                queries.push(query)
            }

            expect(trx.isCompleted()).toBe(false)

            await Promise.all(queries)
            await trx.commit();

            expect(trx.isCompleted()).toBe(true)
        })

        it('read ALL', async () => {
            const trx = await knex.transaction();
            let objs = await trx.select('*').from('tableKnex')
            console.log('objs::', objs.length)
            expect(true).toBe(true)
        })

    })//end description



}