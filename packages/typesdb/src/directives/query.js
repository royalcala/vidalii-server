import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
import models from '../database'
module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @query on FIELD_DEFINITION`,
    fx: class query extends SchemaDirectiveVisitor {
        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            field.resolve = async function (...args) {
                return models.users.getAll()
            };
        }
    }
}