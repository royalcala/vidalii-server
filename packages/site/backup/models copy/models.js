import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "models",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_connection: {
            type: "int",
        },
        alias: {
            type: "varchar",
            length: 150
        }

    }
});