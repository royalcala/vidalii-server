module.exports = ({ db_models_shards, validation }) => {
    test('db_models_shards_val Arguments', () => {
        expect(db_models_shards).toEqual(
            expect.any(Object)
        )
        expect(validation).toEqual(
            expect.any(Object)
        )
        expect(Object.keys(validation)).toEqual(expect.arrayContaining([
            'updateDoc',
            'validateDoc',
            'pre_validate_insert'
        ]))
    })
    return ''
}