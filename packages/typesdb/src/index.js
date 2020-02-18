import webServer from "./instances/Server";
console.log('******In ServerForClient/index.js******')
startServer()
async function startServer() {
  await webServer()
}
