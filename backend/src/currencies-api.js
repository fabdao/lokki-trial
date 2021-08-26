import { RESTDataSource } from 'apollo-datasource-rest';

export default class CurrenciesAPI extends RESTDataSource
{

    constructor()
    {
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://openexchangerates.org/api/';
    }

    async getCurrencies(showAlternative = 1)
    {
        return await this.get('currencies.json', {
            // Query parameters
            show_alternative: showAlternative
        }).then((results) => {
            //Parsing in Array of object for matching dynamical Scheme
            let parsedResults = [];
            for (let key in results) { parsedResults.push({ 'shortName' : key, 'longName': results[key]}); }
            return parsedResults;
        });
    }
}
