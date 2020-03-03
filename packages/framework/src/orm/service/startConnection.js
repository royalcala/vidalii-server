import { createConnection } from "@orm";

export default async (config) => {
    try {
        const connection = await createConnection(config)
        console.log(`The connection "${connection.name}" was created`)
    } catch (error) {
        console.log('Error:', error);

    }
}