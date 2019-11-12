export default () => ({
    json: {
        encode: objectJson => Buffer.from(JSON.stringify(objectJson)),
        // encode: JSON.stringify,
        decode: buf => JSON.parse(buf.toString())
    }
})