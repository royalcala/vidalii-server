import webServer from "./instances/Server";
require('dotenv').config()
console.log('******In ServerForClient/index.js******')

startServer()
async function startServer() {
  await webServer()
}
