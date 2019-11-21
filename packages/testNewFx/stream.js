console.clear()
console.log('in stream.js')
const Readable = require('stream').Readable;
const rs = new Readable();
// console.log('Object.keys(res)::', Object.keys(rs))
rs
    .on('data', data => {
        // rs.pause()
        console.log('data1::', data)
       
       


    })
    .on('error', data => {
        console.log('error::', data)
    })
    .on('close', data => {
        console.log('close::', data)
    })
    .on('end', data => {
        console.log('end::', data)
    })
    .on('readable', () => {
        console.log(`readable: ${rs.read()}`);
    })
    .on('resume', () => {
        console.log(`in resume`);
    });

rs.push('one ');

// rs.destroy()
// rs.isPaused() // === false
// rs.pause()
// // rs.isPaused() // === true
// rs.resume()
// rs.isPaused() // === false
rs.push('two');
for (let index = 0; index < 5; index++) {
    rs.push(String(index));

}
// setTimeout(() => {
//     // rs.push('trhee');
//     rs.resume()
// }, 1000);

rs.push(null);

// rs.pipe(process.stdout);

// const stream = require('stream')
// const readable = new Readable();

