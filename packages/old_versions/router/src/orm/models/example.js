import { EntitySchema } from "@vidalii/framework/src/orm/lib/EntitySchema";
export const ExampleModel = new EntitySchema({
    name: "example",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
});
