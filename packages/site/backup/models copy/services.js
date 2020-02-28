import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "services",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_site: {
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
        }

    }
});