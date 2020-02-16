import { GET_CART_ITEMS } from 'gql/queries'

const resolvers = {
    hola: () => {
        console.log('Entroooo')
        return 'hellow'
    },
    Launch: {
        isInCart: (launch, _, { cache }) => {
            const queryResult = cache.readQuery({ query: GET_CART_ITEMS });
            if (queryResult) {
                return queryResult.cartItems.includes(launch.id)
            }
            return false;
        }
    },
    Query: {
        hola: (...data) => {
            console.log('Entroooo al query hola', data)
            return 2222
        }
    },
    Mutation: {
        addOrRemoveFromCart: (_, { id }, { cache }) => {
            const queryResult = cache.readQuery({ query: GET_CART_ITEMS });
            if (queryResult) {
                const { cartItems } = queryResult;
                const data = {
                    cartItems: cartItems.includes(id)
                        ? cartItems.filter((i) => i !== id)
                        : [...cartItems, id],
                };
                cache.writeQuery({ query: GET_CART_ITEMS, data });
                return data.cartItems;
            }
            return [];
        },
    },
};

export default resolvers