import { EntitySchema } from "typeorm";

export const CategoryEntity = new EntitySchema({
    name: "category",
    columns: {
        id: {
            primary: true,
            type: "int",
            // generated: true
        },
        ip: {
            type: "varchar",
            length: 15
        }
    }
});