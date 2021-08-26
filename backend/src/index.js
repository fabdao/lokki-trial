import { ApolloServer, gql } from 'apollo-server';
import CurrenciesAPI  from './currencies-api.js';

const typeDefs = gql`

  type Currency { 
    shortName: ID,
    longName: String
  }
  
  type Query {
    currencies: [Currency]
  }
`;

const resolvers = {
    Query: {
        currencies: async (_, { showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getCurrencies(showAlternative);
        }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        currenciesAPI: new CurrenciesAPI()
    }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

