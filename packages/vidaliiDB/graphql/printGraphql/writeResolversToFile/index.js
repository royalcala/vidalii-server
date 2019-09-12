https://stackoverflow.com/questions/11275732/writing-js-objects-to-files-including-methods-in-nodejs
// function dump_object(obj) {
//     var buff, prop;
//     buff = [];
//     for (prop in obj) {
//         buff.push(dump_to_string(prop) + ': ' + dump_to_string(obj[prop]))
//     }
//     return '{' + buff.join(', ') + '}';
// }

// function dump_array(arr) {
//     var buff, i, len;
//     buff = [];
//     for (i = 0, len = arr.length; i < len; i++) {
//         buff.push(dump_to_string(arr[i]));
//     }
//     return '[' + buff.join(', ') + ']';
// }

// function dump_to_string(obj) {
//     if (toString.call(obj) == '[object Function]') {
//         return obj.toString();
//     } else if (toString.call(obj) == '[object Array]') {
//         return dump_array(obj);
//     } else if (toString.call(obj) == '[object String]') {
//         return '"' + obj.replace('"', '\\"') + '"';
//     } else if (obj === Object(obj)) {
//         return dump_object(obj);
//     }
//     return obj.toString();
// }

// fs.writeFileSync(__dirname + '/resolvers/Query.js', 'module.exports=\n' + dump_to_string(resolvers.Query))
// const hola = ({ ...data }) => {
//     data.link.a2 = 'nuevo'
//     data.test.yes = 'yes'
// }