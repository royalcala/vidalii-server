import { getConnection } from "typeorm"
export default async ({ connection = 'default', model, data }) => {
    try {
        let rows = Array.isArray(data) ? data : [data]
        console.log('%crows::', 'color: #00e600', rows);
        let promises = []
        await getConnection(connection).transaction(async transactionalEntityManager => {
            for (let index = 0; index < rows.length; index++) {
                const { id, ...others } = rows[index]
                promises.push(
                    transactionalEntityManager
                        .createQueryBuilder()
                        .update(model)
                        .set(others)
                        .where("id = :id", { id })
                        .execute()
                )
            }
        });

        let response = await Promise.all(promises)
        // return always
        // {
        //     "data": {
        //       "updateById": [
        //         {
        //           "generatedMaps": [],
        //           "raw": []
        //         }
        //       ]
        //     }
        //   }
        return {
            update: true
        }
    } catch (error) {
        throw new Error(error)
    }
}
