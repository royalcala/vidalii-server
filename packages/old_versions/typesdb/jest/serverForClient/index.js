import { removeDataBase } from './removeDatabase'
import webServer from "../../src/instances/Server";
console.log('******In ServerForClient/index.js******')
startServer()

async function startServer() {
  await webServer()
}
