const { ApolloServer, gql } = require('apollo-server-fastify')




const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];



const typeDefs = gql`
directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  type Book {
    title: String
    author: String @deprecated(reason: "Use blabla")
  }
  type Query {
    books: [Book]
  }
`;

console.log('typeDefs::',typeDefs)

const resolvers = {
    Query: {
        books: () => books,
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const app = require('fastify')();

(async function () {
    app.register(server.createHandler());
    await app.listen(3000);
    // console.log(`server listening on ${app.address().port}`)
    console.log('server ready on port 3000')
})();