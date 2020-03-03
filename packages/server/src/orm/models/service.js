import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "service",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        alias: {
            type: "varchar",
            length: 150
        },
        port: {
            type: "int"
        },
        type: {
            type: "varchar",
            length: 150
        },
        file: {
            type: "blob"
        }

    }
});