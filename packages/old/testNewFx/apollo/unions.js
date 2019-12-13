console.clear()
console.log('the screen log was cleaned')
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  union Union1 = Book | Author

  type Book {
    title: String
  }

  type Author {
    name: String
    default:String
  }

  interface Compras {
    shard: String
    folio: String
  }
  type Compras1 implements Compras {
    shard: String
    folio: String
  }
  type Compras2 implements Compras{
    shard: String
    folio: String
  }

  type Query {
    searchWithUnion: [Union1]
    book:[Book]
    author:[Author]
    comprasWithInterface: [Compras]
  }


`;
const bookData = [
    { title: 'los legens' },
    { title: 'los legens2' }
]
const authorData = [
    { name: 'Roy' },
    { name: 'Allia' }
]

const resolvers = {
    Author: 
    {
        //__resolveType only for interface or union
        // __resolveType(parent, context, info) {
        //   console.log('on __resolveType',parent)
        // },
        default: (parent) => {
            console.log('in default:', parent)
            return 'default'
        }
    },
    Compras: {
        __resolveType(parent, context, info) {
            if (parent.shard==='Compras1') {
                //cache query 
                return 'Compras1';
            }
            if (parent.shard==='Compras2') {
                //cache query
                return 'Compras2';
            }

            //   if(book.colors){
            //     return 'ColoringBook';
            //   }

            return null;
        },
    },
    Union1: {
        __resolveType(obj, context, info) {
            console.log('++++++obj::', obj)
            if (obj.name) {
                //return the string of the object, 
                //for resolve with the type object
                return 'Author';
                
            }

            if (obj.title) {
                return 'Book';
            }

            return null;
        },
    },
    Query: {
        book: () => {
            return bookData
        },

        searchWithUnion: () => {
            console.log('entro a search')
            return [
                { title: 'from book[0].title' },
                { title: 'from  book[1].title' },
                { name: 'from author[0].name' },
                // { noOne: 'from author[0].name' }
            ]
        },
        comprasWithInterface: () => {
            return [
                { shard: 'Compras1', folio: 1 },
                { shard: 'Compras2', folio: 2 }
            ]
        },
        author:()=>{
            return authorData
        }
    },
};
// {
//     search {
//       __typename
//       ... on Book {
//         title
//       }
//         ... on  Author{
//         name
//       }
//     }
//   }

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});