import { EntitySchema } from "typeorm";

export const CategoryEntity = new EntitySchema({
    name: "category",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        name2: {
            type: "varchar",
            nullable: true
        }
    }
});