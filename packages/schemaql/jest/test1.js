export default () => {
    describe('bettersql', () => {
        // let sqlitedb
        let sampleSize
        let db
        beforeAll(async () => {
            sampleSize = global.sampleSize
            db = global.bettersql

        });

        it('create Table', async () => {
            const createTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS posts (
            idss integer PRIMARY KEY AUTOINCREMENT,
            datajson json            
            )
        `);
            createTable.run()
            // db.function("add2", (a, b) => {
            //     console.log('enotroooo', a)
            //     return a + b
            // });
            // let result
            // result = db.prepare('SELECT add2(?, ?)').get(12, 4);
            // console.log('result::', result)
            // result = db.prepare('SELECT add2(?, ?)').get(122, 4);
            // console.log('result::', result)
        })
        it('create function deterministic', async () => {
            db.function("json_value",
                { deterministic: true, varargs: true },
                (json_text, key) => {
                    return json_text ? JSON.parse(json_text)[key] : null
                }
            )
            // let result = db.prepare('SELECT json_value(?, ?)').get(
            //     JSON.stringify({ name: 'world' }),
            //     'hellow');
            // console.log('result::', result)
        })
        it('create function deterministic array', async () => {
            db.function("json_value",
                { deterministic: true, varargs: true },
                (jsonArray, key) => {
                    return jsonArray ? JSON.parse(jsonArray)[key] : null
                }
            )
            // let result = db.prepare('SELECT json_value(?, ?)').get(
            //     JSON.stringify({ name: 'world' }),
            //     'hellow');
            // console.log('result::', result)
        })
        it('create index in json name with like COLLATE NOCASE', async () => {
            const createIndex = db.prepare(`
                    CREATE INDEX idx_datajson
                    ON posts(json_value(datajson,'name') COLLATE NOCASE) 
        `)
            createIndex.run()
        })
        it('insert one', async () => {
            const stmt = db.prepare('INSERT INTO posts (datajson) VALUES (?)');
            // stmt.run(1, JSON.stringify({ hellow: 'world' }), 'string');
            stmt.run(JSON.stringify({ name: 'worldFIRST' }))
        })
        it('insert many transaction', async () => {
            const queryInsert = db.prepare('INSERT INTO posts (datajson) VALUES (@datajson)');
            const insertManyTransaction = db.transaction((rows) => {
                // console.log('rows::',rows)
                for (const row of rows) queryInsert.run(row);
            });
            let rows = []
            for (let index = 0; index < sampleSize; index++) {
                rows.push({
                    datajson: JSON.stringify({
                        name: 'world' + index,
                        name2: 'world' + index
                    })
                })
            }
            insertManyTransaction(rows)
        })
        it('read with index ', async () => {
            let stmt, posts
            let query = `SELECT 
            json_value(datajson,'name') as name 
            FROM posts
            WHERE 
            name like 'world1'
            `
            let explainQuery = `EXPLAIN QUERY PLAN ` + query
            // stmt = db.prepare(query);
            // posts = stmt.all();

            // console.log(posts.length); // => 1
            // console.log('posts::', posts)

            stmt = db.prepare(explainQuery).get();
            console.log('stmt::', stmt)


            expect(true).toBe(
                stmt.detail.includes('USING INDEX')
            )

            stmt = db.prepare(query);
            posts = stmt.all();
        })
        it('read withOut index ', async () => {
            let stmt, posts
            let query = `SELECT 
            json_value(datajson,'name2') as name2 
            FROM posts
            WHERE 
            name2 like 'world1'
            `
            let explainQuery = `EXPLAIN QUERY PLAN ` + query
            // stmt = db.prepare(query);
            // posts = stmt.all();

            // console.log(posts.length); // => 1
            // console.log('posts::', posts)

            stmt = db.prepare(explainQuery).get();
            console.log('stmt::', stmt)


            expect(false).toBe(
                stmt.detail.includes('USING INDEX')
            )

            stmt = db.prepare(query);
            posts = stmt.all();
        })

    })

}