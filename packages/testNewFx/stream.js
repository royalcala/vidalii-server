console.clear()
console.log('in stream.js')
const Readable = require('stream').Readable;
const rs = new Readable();
// console.log('Object.keys(res)::', Object.keys(rs))
rs
    .on('data', data => {
        // rs.pause()
        // console.log('data1::', data)
        // rs.destroy()
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


// rs.isPaused() // === false
// rs.pause()
// // rs.isPaused() // === true
// rs.resume()
// rs.isPaused() // === false
var millions = n => 1000000 * n
rs.push('two');
console.time('rs.push')
for (let index = 0; index < millions(1); index++) {
    rs.push(String(index));

}
console.timeEnd('rs.push')
// setTimeout(() => {
//     // rs.push('trhee');
//     rs.resume()
// }, 1000);

rs.push(null);

// rs.pipe(process.stdout);

// const stream = require('stream')
// const readable = new Readable();

