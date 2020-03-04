module.exports = {
    name: 'hello',
    args: '(state:String)',
    onDefs: ['FIELD_DEFINITION'],
    resolver: {
        visitFieldDefinition: function (field) {
            return 'hello world!'
        }
    }
}