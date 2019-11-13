export default () => ({
    json: {
        //BOTH CASES WORKS
        //CASE1
        // encode: objectJson => Buffer.from(JSON.stringify(objectJson)),       
        // decode: buf => JSON.parse(buf.toString())
        //CASE2
        encode: JSON.stringify,
        decode: JSON.parse
    }
})