

export default () => {
    describe('sqlite', () => {
        let sqlitedb
        let sampleSize
        beforeAll(async () => {
            sampleSize = global.sampleSize
            sqlitedb = global.sqlitedb


        });

        it('create Table', async () => {
            let db = sqlitedb
            const createPostTable = () => {
                console.log("in create table")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run(`
                            CREATE TABLE IF NOT EXISTS posts (
                            id integer PRIMARY KEY,
                            title text,
                            description text,
                            createDate text,
                            author text )`, (err) => {
                        if (err) {
                            reject(null);
                        }
                        resolve('created table')
                    });
                });
            }
            let response = await createPostTable()
            console.log('response::', response)
        })
        it('create Index1', async () => {
            let db = sqlitedb
            const createIndex = () => {
                console.log("in create index")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run(`
                    CREATE UNIQUE INDEX idx_title 
                    ON posts (title)`, (err) => {
                        if (err) {
                            reject(null);
                        }
                        resolve('index created')
                    });
                });
            }
            let response = await createIndex()
            console.log('response::', response)
        })
        it('create Index2', async () => {
            let db = sqlitedb
            const createIndex = () => {
                console.log("in create index")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run(`
                    CREATE UNIQUE INDEX idx_description 
                    ON posts (description)`, (err) => {
                        if (err) {
                            reject(null);
                        }
                        resolve('index created2')
                    });
                });
            }
            let response = await createIndex()
            console.log('response::', response)
        })
        it('create Index3', async () => {
            let db = sqlitedb
            const createIndex = () => {
                console.log("in create index")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run(`
                    CREATE UNIQUE INDEX idx_author 
                    ON posts (author)`, (err) => {
                        if (err) {
                            reject(null);
                        }
                        resolve('index created3')
                    });
                });
            }
            let response = await createIndex()
            console.log('response::', response)
        })

        it('insert many', async () => {
            // var sqlite3 = require('sqlite3').verbose();

            let db = sqlitedb
            const insertData = () => {
                console.log("Insert data")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run('INSERT INTO Posts (title, description, createDate, author) VALUES (?,?,?,?);', ['title', 'description', 'createDate', 'author'], (err) => {
                        if (err) {
                            reject(err);
                        }
                        db.get("SELECT last_insert_rowid() as id", (err, row) => {

                            resolve({
                                id: row["id"]
                            });
                        });
                    });
                })
            }

            const insertMany = async () => {
                return new Promise((res1, rej1) => {
                    db.serialize(async () => {
                        db.run("begin transaction");
                        var stmt = db.prepare("INSERT INTO Posts (title) VALUES (?)");
                        let promises = []
                        for (var i = 0; i < sampleSize; i++) {
                            stmt.run("title" + i)
                        }

                        db.run("commit", (err) => {
                            if (err)
                                rej1()
                            else
                                res1()
                        });
                    })
                })
            }





            // response = await insertData()
            // console.log('response::', response)
            let response = await insertMany()
            console.log('response insert many::', response)

        })

        it('read all', async () => {
            let db = sqlitedb

            const readAll = () => {
                console.log("readAll")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.all('SELECT * FROM Posts', (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);

                    });
                })
            }
            let response = await readAll()
            expect(response.length).toEqual(sampleSize)
            console.log('response.length::', response.length)
        })

        it('read with index', async () => {
            let db = sqlitedb
            const readAll = () => {
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.all('SELECT * FROM Posts WHERE title=(?);', ['title1'], (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);

                    });
                })
            }
            let response = await readAll()
            expect(response.length).toEqual(1)
            console.log('response.length::', response.length)
        })

        // it('PerformanceSqlite', async () => {
        //     var knex = require('knex')({
        //         client: 'sqlite3',
        //         connection: {
        //             filename: "./mydb.sqlite"
        //         }
        //     });
        //     // console.log('knex::',knex)
        //     let response
        //     response = await knex.schema.createTable('cars', (table) => {
        //         table.increments('id')
        //         table.integer('folio')
        //         table.string('spec')
        //     })
        //     console.log('table created')
        //     let howMany = sampleSize
        //     let sample = []
        //     for (let index = 0; index < howMany; index++) {
        //         sample.push({
        //             // type: 'put',
        //             // key: index,
        //             folio: index,
        //             spec: 'hola'
        //             // spec: `{ size: 12.5, color: 'colorBlue' }`
        //             // value: { folio: index }
        //         })
        //     }

        //     // response = knex('cars')
        //     //     // .returning('id')
        //     //     .insert(sample)
        //     // console.log('response::', response)
        //     // var chunkSize = 30;
        //     // response = await new Promise((resolve) => {
        //     //     // knex.batchInsert('cars', sample, chunkSize)
        //     //     //     .then(
        //     //     //         () => {
        //     //     //             resolve('inserted')
        //     //     //         }
        //     //     //     )
        //     //     knex('cars')
        //     //         // .returning('id')
        //     //         .insert(sample).then(
        //     //             x => {
        //     //                 console.log('inserted')
        //     //                 resolve('inserted')
        //     //             }
        //     //         )
        //     // })


        // })

    })

}