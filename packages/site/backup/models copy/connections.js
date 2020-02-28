import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "connections",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_service: {
            type: "int"
        },
        alias: {
            type: "varchar",
            length: 150
        }

    }
});