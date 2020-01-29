export const typeCast = {
    int: {
        graphql: 'Int',
        knex: 'integer',
        typeorm: 'integer'
    },
    string: {
        graphql: 'String',
        knex: 'string',
        typeorm: 'varchar'
    },
    uuid: {
        graphql: 'ID',
        knex: 'uuid',
        typeorm: 'varchar'
    },
    ref: {
        graphql: 'is a ref get from oSchema.get() when is needed',
        knex: 'is a ref get from oSchema.get() when is needed',
        typeorm: 'is a ref get from oSchema.get() when is needed'
    },
    // type: {
    //     one_to_one: {
    //         graphql: 'update with a type',
    //         knex: ''
    //     },
    //     one_to_many: {
    //         graphql: 'update with a type',
    //         knex: ''
    //     }
    // }
}