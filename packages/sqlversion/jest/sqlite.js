export default () => {
    describe('sqlite3', () => {
        let sqlitedb
        let sampleSize
        beforeAll(async () => {
            sampleSize = global.sampleSize
            sqlitedb = global.sqlitedb


        });

        it('create Table', async () => {
            let db = sqlitedb
            const createPostTable = () => {                
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run(`
                            CREATE TABLE IF NOT EXISTS posts (
                            idss integer PRIMARY KEY,
                            title text,
                            description text,
                            createDate text,
                            author text,
                            datajson json,
                            phones json
                            )`, (err) => {
                        if (err) {
                            reject(null);
                        }
                        resolve('created table')
                    });
                });
            }
            let response = await createPostTable()            
        })
        // it('create Index1', async () => {
        //     let db = sqlitedb
        //     const createIndex = () => {                
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             db.run(`
        //             CREATE UNIQUE INDEX idx_title 
        //             ON posts (title)`, (err) => {
        //                 if (err) {
        //                     reject(null);
        //                 }
        //                 resolve('index created')
        //             });
        //         });
        //     }
        //     let response = await createIndex()
        //     console.log('response::', response)
        // })
        // it('create Index2', async () => {
        //     let db = sqlitedb
        //     const createIndex = () => {                
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             db.run(`
        //             CREATE UNIQUE INDEX idx_description 
        //             ON posts (description)`, (err) => {
        //                 if (err) {
        //                     reject(null);
        //                 }
        //                 resolve('index created2')
        //             });
        //         });
        //     }
        //     let response = await createIndex()
        //     console.log('response::', response)
        // })
        // it('create Index3 json', async () => {
        //     let db = sqlitedb
        //     const createIndex = () => {
        //         console.log("in create index3")
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table 
        //             // db.query("CREATE INDEX countries_name ON countries ( json_value(json_text, 'name') COLLATE NOCASE )")
        //             db.run(`
        //             CREATE  INDEX idx_datajson
        //             ON posts (json_extract("datajson", "$.index"))`, (err) => {
        //                 if (err) {
        //                     reject(null);
        //                 }
        //                 resolve('index created3')
        //             });
        //         });
        //     }
        //     let response = await createIndex()
        //     console.log('response::', response)
        // })
        // insert into `table1` (`folio`, `spec`) select 0 as `folio`, 'car number 0' as `spec` union all select 1 as `folio`, 'car number 1' as `spec` union all select 2 as `folio`, 'car number 2' as `spec`
        
        // it('insert type2', async () => {
        //     // var sqlite3 = require('sqlite3').verbose();
        //     let db = sqlitedb
        //     const insertData = () => {
        //         console.log("Insert data")
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             db.run('INSERT INTO posts (title, description, createDate, author,datajson) VALUES (?,?,?,?,?);', ['title', 'description', 'createDate', 'author', '{}'], (err) => {
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 db.get("SELECT last_insert_rowid() as id", (err, row) => {

        //                     resolve({
        //                         id: row["id"]
        //                     });
        //                 });
        //             });
        //         })
        //     }

        //     const insertMany = async () => {
        //         return new Promise((res1, rej1) => {
        //             db.serialize(async () => {
        //                 db.run("begin transaction");
        //                 // var stmt = db.prepare("INSERT INTO posts (title,author,datajson) VALUES (?,?,json(\'{\"name\":\"yvan\"}\'))");
        //                 var stmt = db.prepare("INSERT INTO posts (title) select 0 as title");
        //                 // let promises = []
        //                 // for (var i = 0; i < sampleSize; i++) {
        //                 //     stmt.run("title" + i, 'author' + i,
        //                 //         JSON.stringify({ index: i,hola:{hola2:1} }),
        //                 //         JSON.stringify([i, i + 1])
        //                 //     )
        //                 // }

        //                 db.run("commit", (err) => {
        //                     if (err)
        //                         rej1()
        //                     else
        //                         res1()
        //                 });
        //             })
        //         })
        //     }

        //     // response = await insertData()
        //     // console.log('response::', response)
        //     let response = await insertMany()
        //     // console.log('response insert many::', response)

        // })

        it('insert many', async () => {
            // var sqlite3 = require('sqlite3').verbose();
            let db = sqlitedb


            const insertData = () => {
                console.log("Insert data")
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.run('INSERT INTO posts (title, description, createDate, author,datajson) VALUES (?,?,?,?,?);', ['title', 'description', 'createDate', 'author', '{}'], (err) => {
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
                        // var stmt = db.prepare("INSERT INTO posts (title,author,datajson) VALUES (?,?,json(\'{\"name\":\"yvan\"}\'))");
                        var stmt = db.prepare("INSERT INTO posts (title,author,datajson,phones) VALUES (?,?,?,?)");
                        let promises = []
                        for (var i = 0; i < sampleSize; i++) {
                            stmt.run("title" + i, 'author' + i,
                                JSON.stringify({ index: i,hola:{hola2:1} }),
                                JSON.stringify([i, i + 1])
                            )
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
            // console.log('response insert many::', response)

        })

        it('read all', async () => {
            let db = sqlitedb

            const readAll = () => {
                return new Promise((resolve, reject) => {
                    //raw SQLite to insert a new post in post table
                    db.all('SELECT * FROM posts', (err, rows) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows);

                    });
                })
            }
            let response = await readAll()
            // console.log(response)
            expect(response.length).toEqual(sampleSize)
        })

        // it('read with index', async () => {
        //     let db = sqlitedb
        //     const readAll = () => {
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             db.all('SELECT * FROM posts WHERE title=(?);', ['title1'], (err, rows) => {
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 resolve(rows);

        //             });
        //         })
        //     }
        //     let response = await readAll()
        //     expect(response.length).toEqual(1)
        // })


        // it('read indexed json', async () => {
        //     let db = sqlitedb

        //     const readAll = () => {
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             // db.all('SELECT * FROM posts WHERE json_extract("datajson", "$.index") is not null', (err, rows) => {
        //             db.all('SELECT * FROM posts WHERE json_extract("datajson", "$.index")=1', (err, rows) => {
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 resolve(rows);

        //             });
        //         })
        //     }
        //     let response = await readAll()
        //     // console.log(response)
        //     expect(response.length).toEqual(1)
        //     // console.log('response.length::', response.length)
        // })


        // it('read json_each', async () => {
        //     let db = sqlitedb

        //     const readAll = () => {
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             // db.all('SELECT * FROM posts WHERE json_extract("datajson", "$.index") is not null', (err, rows) => {
        //             db.all('SELECT * FROM posts, json_each(posts.phones) WHERE json_each.value=0', (err, rows) => {
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 resolve(rows);

        //             });
        //         })
        //     }
        //     let response = await readAll()
        //     // console.log(response)
        //     expect(response.length).toEqual(1)
        //     // console.log('response.length::', response.length)
        // })

        // it('read json_tree', async () => {
        //     let db = sqlitedb

        //     const readAll = () => {
        //         return new Promise((resolve, reject) => {
        //             //raw SQLite to insert a new post in post table
        //             // db.all('SELECT * FROM posts WHERE json_extract("datajson", "$.index") is not null', (err, rows) => {
        //             db.all('SELECT * FROM posts, json_tree(posts.datajson)', (err, rows) => {
        //                 if (err) {
        //                     reject(err);
        //                 }
        //                 resolve(rows);

        //             });
        //         })
        //     }
        //     let response = await readAll()
        //     // console.log(response)
        //     expect(true).toEqual(true)
        //     // console.log('response.length::', response.length)
        // })
       

    })

}