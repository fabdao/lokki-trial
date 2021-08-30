import {useAppContext} from "../../context/state";
import {useQuery, gql} from "@apollo/client";
import DatePick from "../datePick/datePick";
import Select from 'react-select';
import styles from "./formConverter.module.css";

const QUERY_CURRENCIES = gql`
  query {
    allCurrencies {
        shortName
        longName
    }
  }
`;

export default function FormConverter()
{
    const { data, loading, error } = useQuery(QUERY_CURRENCIES);

    const options = [];
    const [context, setContext] = useAppContext();

    if (loading) {
        return <h2><a href="#loading" aria-hidden="true" class="aal_anchor" id="loading"><svg aria-hidden="true" class="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return <h3>Ce site s'auto détruira dans 10 secondes... 9, 8, 7 ...</h3>;
    }

    if (data)
    {
        data.allCurrencies.forEach(
            function(item){ options.push({ value: item.shortName, label: item.longName}) }
        )
    }

    const convertCurrencies = async event => {
        event.preventDefault();
        setContext({...context, result: true });
    }

    return (
        <form className={styles.container} onSubmit={convertCurrencies}>
            <div className={styles.leftContainer}>
                <DatePick />
            </div>
            <div className={styles.rightContainer}>
                <div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="amount">Amount</label>
                        <input id="amount" name="amount" className={styles.fieldInput} type="text" autoComplete="amount" value={context.amount}
                            onChange={(e) => { setContext({...context, amount: e.target.value, result: false })}}  required />
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="from">From</label>
                        <Select id="from" name="from" options={options} onChange={(e) => { setContext({...context, from: e.value, result: false })}} required/>
                    </div>
                    <div className={styles.fieldContainer}>
                        <label htmlFor="to">To</label>
                        <Select id="to" name="to" options={options} onChange={(e) => { setContext({...context, to: e.value, result: false })}} required/>
                    </div>
                    <div className={styles.fieldContainer}>
                        <button type="submit" className={styles.submitBtn}>Convert</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
