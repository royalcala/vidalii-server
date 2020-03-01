import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "service",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_server: {
            type: "int"
        },
        alias: {
            type: "varchar",
            length: 150
        },
        dns: {
            type: "varchar",
            length: 253
        },
        port: {
            type: "int"
        },
        type: {
            type: "varchar",
            length: 150
        },

    }
});