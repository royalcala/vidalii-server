// import { EntitySchema } from "typeorm";
import { EntitySchema } from "@vidalii/framework/src/orm/lib/EntitySchema";

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