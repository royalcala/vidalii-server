import { EntitySchema } from "@vidalii/orm/lib/EntitySchema";
// https://stackoverflow.com/questions/32290167/what-is-the-maximum-length-of-a-dns-name
export const ExampleModel = new EntitySchema({
    name: "server",
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
        dns: {
            type: "varchar",
            length: 253
        },
        ipv4: {
            type: "varchar",
            length: 11
        }
    }
});