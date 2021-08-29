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

        //console.log(this.rangeDay(new Date("2018-05-01"),new Date("2018-07-01")))
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

    async getPricePerDay(shortName, strDay, showAlternative = 1)
    {
        return await this.get('historical/'+ strDay +'.json', {
            // Query parameters
            app_id: this.idApi,
            symbols: shortName,
            show_alternative: showAlternative
        }).then((results) => {
            //Parsing in Array of object for matching dynamical Scheme
            let parsedResults;
            for (let key in results.rates)
            {
                parsedResults = {
                    'shortName' : key,
                    'date': strDay,
                    'price': results.rates[key]
                };
            }
            //console.log(parsedResults);
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
                parsedResults.push({
                    'shortName' : key,
                    'date': strDay,
                    'price': results.rates[key]
                });
            }
            //console.log(parsedResults);
            return parsedResults;
        });
    }

    rangeDay(startDate, endDate)
    {
        for(var arr=[],dt=new Date(startDate); dt<=endDate; dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt).toISOString().slice(0,10));
        }
        return arr;
    }

    async getTargetPricePerRange( shortName, startDay, endDay, showAlternative = 1)
    {
        let arrayDate = this.rangeDay(new Date(startDay),new Date(endDay));

        let parsedResults = {
            shortName: shortName,
            prices: []
        }

        for (let i=0; i < arrayDate.length; i++)
        {
            await this.get('historical/'+ arrayDate[i] +'.json', {
                // Query parameters
                app_id: this.idApi,
                symbols: shortName,
                show_alternative: showAlternative
            }).then((results) => {
                //Parsing in Array of object for matching dynamical Scheme
                for (let key in results.rates)
                {
                    parsedResults.prices.push({
                        'date': arrayDate[i],
                        'price': results.rates[key]
                    });
                }
            });
        }
        //console.log(parsedResults);
        return parsedResults;
    }
}
