import merge from 'lodash.merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDef as Currency } from './currency-schema.js';
import { typeDef as Price } from './price-schema.js';
import { typeDef as RangePrices } from './range_prices-schema.js';
import { typeDef as Query, resolvers as queryResolvers } from './queries.js';

export const schema = makeExecutableSchema({
    typeDefs: [ Query, Currency, Price, RangePrices ],
    resolvers: merge(queryResolvers),
});
