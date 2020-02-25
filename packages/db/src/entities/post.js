import { EntitySchema } from "typeorm";

export const Post = new EntitySchema({
    name: "post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "varchar"
        },
        text: {
            type: "text"
        }
    },
    relations: {
        categories: {
            target: "category",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        }
    }
});