import { RESTDataSource } from 'apollo-datasource-rest';

export default class CurrenciesAPI extends RESTDataSource
{
    idApi;

    constructor()
    {
        // Always call super()
        super();
        this.idApi = '374d9739a6fd4e6fa9324124a92ef53c';

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

    async getPricesPerDay(strDay, showAlternative = 1)
    {
        return await this.get('historical/'+ strDay +'.json', {
            // Query parameters
            app_id: this.idApi,
            show_alternative: showAlternative
        }).then((results) => {
            //Parsing in Array of object for matching dynamical Scheme
            let parsedResults = [];
            for (let key in results.rates)
            {
                // parsedResults.push({
                //     'shortName' : key,
                //     'prices': [
                //         {
                //             'shortName' : key,
                //             'date': strDay,
                //             'price': results.rates[key]
                //         }
                //     ]
                // });

                parsedResults.push({
                    'shortName' : key,
                    'date': strDay,
                    'price': results.rates[key]
                });
            }
            console.log(parsedResults);
            return parsedResults;
        });
    }
}
