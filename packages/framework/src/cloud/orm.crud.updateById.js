import { getConnection } from "@orm"
export default async ({ connection = 'default', model, dataUpdate }) => {
    try {
        let rows = Array.isArray(dataUpdate) ? dataUpdate : [dataUpdate]
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
        //     "dataUpdate": {
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
