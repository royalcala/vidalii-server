import { defaultFieldResolver } from "graphql";
const { SchemaDirectiveVisitor } = require('apollo-server-fastify')
const fs = require('fs-extra')
const name = 'sitesUnion'
const union = ({ key, data, alias, joinKey, joinData }) => {
    return data.map(e1 => {
        return {
            ...e1,
            [alias]: joinData.map(e2 => {
                if (e2[joinKey] && e2[joinKey] === e1[key])
                    return e2
            })
        }

    }
    )
}
module.exports = {
    sdl: `directive @${name} on FIELD_DEFINITION`,
    resolver: {
        [name]: class defaultNameExtended extends SchemaDirectiveVisitor {
            visitFieldDefinition(field) {
                const { resolve = defaultFieldResolver } = field;
                field.resolve = async function (...args) {
                    const { sites, services,
                        connections, models } = await resolve.apply(this, args);
                    return union({
                        key: 'id',
                        data: sites,
                        alias: 'services',
                        joinKey: 'id_site',
                        joinData: union({
                            key: 'id',
                            data: services,
                            alias: 'connections',
                            joinKey: 'id_service',
                            joinData: union({
                                key: 'id',
                                data: connections,
                                alias: 'models',
                                joinKey: 'id_connection',
                                joinData: models
                            })
                        })
                    })

                }
            }
        }
    }
}