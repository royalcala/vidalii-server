export const server = {
    name: "server",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        id_site: {
            type: "int",
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
}
