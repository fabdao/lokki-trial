import { ApolloServer, gql } from 'apollo-server';
import CurrenciesAPI  from './currencies-api.js';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';

const typeDefs = gql`

  type Currency { 
    shortName: ID,
    longName: String
  }
  
  type Price
  {
    shortName: ID,
    date: ID,
    price: Float
  }
   
  type Query 
  {
    currencies: [Currency],
    prices(strDay: String): [Price]
  }
`;

const resolvers = {
    Query: {
        currencies: async (_, { showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getCurrencies(showAlternative);
        },
        prices: async (_, { strDay, showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getPricesPerDay(strDay, showAlternative);
        }
    },
};

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const mergedSchema = mergeSchemas({
    schemas: [
        schema
    ],
    typeDefs: `
        type AllPrice {
            currency: Currency,
            prices : [Price]
        }
    `,
    resolvers: {
        AllPrice: {
            currency: () => 'test',
            prices: () => 'tata',
        }
    }
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: mergedSchema,
    dataSources: () => ({
        currenciesAPI: new CurrenciesAPI()
    }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

