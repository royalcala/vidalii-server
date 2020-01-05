import { nSQL } from "@nano-sql/core";

export default () => {
    describe('nanosql', () => {

        let sampleSize, db
        beforeAll(async () => {
            sampleSize = global.sampleSize
            db = global.pouchdb
        });
        test('insertManyBatch', async () => {

            let nanodb = await nSQL().createDatabase({
                id: "./my_db", // can be anything that's a string
                mode: "PERM", // save changes to IndexedDB, WebSQL or SnapDB!
                tables: [ // tables can be created as part of createDatabase or created later with create table queries
                    {
                        name: "users",
                        model: {
                            "id:uuid": { pk: true },
                            "name:string": {},
                            "age:int": {}
                        }
                    }
                ],
                version: 3, // current schema/database version
                onVersionUpdate: (prevVersion) => { // migrate versions
                    return new Promise((res, rej) => {
                        switch (prevVersion) {
                            case 1:
                                // migrate v1 to v2
                                res(2);
                                break;
                            case 2:
                                // migrate v2 to v3
                                res(3);
                                break;
                        }

                    });

                }
            })

            const dbList = nSQL().listDatabases();
            console.log(dbList) // ["db1", "db2", ...]

            nSQL("users")
                .query("upsert", [{ name: "billy", age: 50 }, { name: "jeb", age: 30 }])
                .exec()


            // .then(() => {
            //     // ready to query!
            //     console.log('nanosql db created')
            // }).catch(() => {
            //     // ran into a problem
            //     console.log('ERROR nanosql db created')
            // })


            // console.log('data::', data)

            expect(true).toEqual(true)

        })



    })

}