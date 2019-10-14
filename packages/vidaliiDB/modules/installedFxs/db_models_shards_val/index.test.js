module.exports = ({ db_models_shards, validation, schemas }) => {
    test('db_models_shards_val Arguments', () => {
        expect(db_models_shards).toEqual(
            expect.any(Object)
        )
        expect(schemas).toEqual(
            expect.any(Object)
        )
        // console.log('schemas::', schemas)
        expect(validation).toEqual(
            expect.any(Object)
        )
        expect(Object.keys(validation)).toEqual(expect.arrayContaining([
            'updateDoc',
            'validateDoc',
            'pre_validate_insert'
        ]))
    })

    const db_models_shards_val = require('./index')({
        db_models_shards, validation
    })

    return db_models_shards_val
}