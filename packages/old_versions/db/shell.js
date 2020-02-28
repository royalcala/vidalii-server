const { spawn } = require('child_process');

removeDatabase()
// remove()
// link()
function removeDatabase() {
    // rm dellLaptopSerials.txt
    const command = spawn('rm', [
        '/home/vidalii/Documents/softwareCodes/vidalii-server/packages/db/databases/mydb.sqlite',
    ])


    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    command.on('close', (code) => {
        console.log(`child process rm_DATABASE exited with code ${code}`);
    });

}
function remove() {
    // rm dellLaptopSerials.txt
    const command = spawn('rm', [
        '/home/vidalii/Documents/softwareCodes/vidalii-server/ormconfig.json'
    ])


    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    command.on('close', (code) => {
        console.log(`child process rm exited with code ${code}`);
    });

}

function link() {
    // ln -s /opt/foo /usr/bin/bar
    const command = spawn('ln', [
        '-s',
        '/home/vidalii/Documents/softwareCodes/vidalii-server/packages/db/ormconfig.json',
        '/home/vidalii/Documents/softwareCodes/vidalii-server'
    ])


    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    command.on('close', (code) => {
        console.log(`child process ln exited with code ${code}`);
    });

}
// const ls = spawn('ls', ['-lh', '/usr']);


// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   ls.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
//   });