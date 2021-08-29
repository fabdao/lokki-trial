import { ApolloServer } from 'apollo-server';
import CurrenciesAPI  from './apis/currencies-api.js';
import { schema } from './schemas/schemas.js';

const server = new ApolloServer({
    schema: schema,
    dataSources: () => ({
        currenciesAPI: new CurrenciesAPI()
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
