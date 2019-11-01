var requireContext = require('require-context');
var data = requireContext(__dirname + '/src', true, /\.index\.js$/)
console.log(
    'data::',
    data('data1/index.js')
)

function importAll(r) {

    console.log('r::', r)
    console.log('keys::', r.keys())

    r.keys().forEach((key) => {
        console.log('keys:', key)
        console.log(
            'resolve:',
            r(key)
        )
        return key
    });
}
importAll(requireContext(__dirname + '/src', true, /\.js$/))
