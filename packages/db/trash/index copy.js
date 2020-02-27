// /home/vidalii/Documents/softwareCodes/vidalii-server/packages/typesdb/src/old/backendOld/databases/crud/applyFilters.js
require('dotenv').config()
import { createConnection } from "typeorm";
import config from "#src/configs/dbs.json";
import startServer from "#src/services/server";
console.log('in @vidalii/db')
const startConnection = async () => {
    try {
        const connection = await createConnection(config)
        console.log(`The connection "${connection.name}" was created`)
    } catch (error) {
        console.log('Error:', error);

    }
}
const main = async () => {
    await startConnection()
    await startServer()
}


main()