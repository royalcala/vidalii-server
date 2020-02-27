module.exports = {
    sdl: `
    type Person{
        name:String
        lastName:String
    }
    `,
    resolver: {
        Person: {
            // name: () => "Roy",
            lastName: () => 'From Type:Resolver Alcala'
        }
    }
}