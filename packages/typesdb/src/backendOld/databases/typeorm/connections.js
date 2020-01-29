import { createConnection } from "typeorm";
import { getEntities } from './entities'
import dbs from '../../databases'
export const startInstancesConnections = async () => {
    const { byConnection } = getEntities()
    const storeConnections = dbs.get().connections
    let nameConnection
    for (nameConnection in byConnection) {
        const { name, type, database, synchronize,
            ...others } = storeConnections[nameConnection]
        try {
            await createConnection({
                name,
                type,
                database,
                entities: byConnection[nameConnection],
                // entitySchemas: byConnection[nameConnection],
                synchronize: true,
                // logging: true,
                // logger: 'advanced-console',
            });
            return {
                error: null
            }
        } catch (error) {
            return { error }
        }



    }

} 