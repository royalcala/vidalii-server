require('dotenv').config()
import startServer from "#src/services/server";
console.log('in @vidalii/router')
const main = async () => {    
    await startServer()
}

main()