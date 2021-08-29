
export const typeDef = `
  type Query 
  {
    allCurrencies: [Currency],
    allPricesPerDay(strDay: String): [Price],
    targetPricePerDay(shortName: String, strDay: String): Price,
    targetPricesPerRange(shortName: String, startDay: String, endDay: String): RangePrices
  }
`;

export const resolvers = {
    Query: {
        allCurrencies: async (_, { showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getCurrencies(showAlternative);
        },
        allPricesPerDay: async (_, { strDay, showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getPricesPerDay(strDay, showAlternative);
        },
        targetPricePerDay: async (_, { shortName, strDay, showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getPricePerDay( shortName, strDay, showAlternative);
        },
        targetPricesPerRange: async (_, { shortName, startDay, endDay, showAlternative }, { dataSources }) => {
            return dataSources.currenciesAPI.getTargetPricePerRange( shortName, startDay, endDay, showAlternative);
        }
    },
};
