import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const jwt = require('jsonwebtoken')

module.exports = {
    // type: 'directive',
    // alias: 'upper',
    sdl: `directive @session_get on FIELD_DEFINITION`,
    fx: class UpperCaseDirective extends SchemaDirectiveVisitor {


        visitFieldDefinition(field) {
            const { resolve = defaultFieldResolver } = field;
            // console.log('**********FIELD::', field)
            // console.log('field.astNode::', field.astNode.directives)
            field.resolve = async function (parent, { username, password }) {
                if (username === 'alcala.rao@gmail.com' && password === 'a') {
                    const fromDatabase = {
                        id: 1,
                        username: 'alcala.rao@gmail.com',
                    }
                    const token = jwt.sign(
                        fromDatabase,
                        'my-secret-from-env-file-in-prod',
                        {
                            expiresIn: '1d', // token will expire in 1days
                        },
                    )

                    // console.log('%c⧭', 'color: #00a3cc', token);
                    return {
                        ...fromDatabase,
                        token
                    }
                }
                else
                    throw new Error('Your username or password is incorrect')
            };
        }
    }
}