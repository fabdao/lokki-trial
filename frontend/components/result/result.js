import styles from './result.module.css'
import utilStyles from '../../styles/utils.module.css'
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import {useAppContext} from '../../context/state';

const QUERY_PRICES_TO = gql`
  query getTargetPricePerDayTO( $to: String, $strDay: String) 
  {
    targetPricePerDay( shortName: $to, strDay: $strDay)
    {
        shortName
        date
        price
    }
  }
`;

const QUERY_PRICES_FROM = gql`
  query getTargetPricePerDayFROM( $from: String, $strDay: String) 
  {
    targetPricePerDay( shortName: $from, strDay: $strDay)
    {
        shortName
        date
        price
    }
  }
`;

export default function Result() {

    const [context, setContext] = useAppContext();

    const reqTo = useQuery(QUERY_PRICES_TO, {
        variables: { to: context.to, strDay: context.date.toISOString().slice(0,10) }
    });

    const reqFrom = useQuery(QUERY_PRICES_FROM, {
        variables: { from: context.from, strDay: context.date.toISOString().slice(0,10) }
    });

    if (reqTo.loading || reqFrom.loading) return <p>Loading ...</p>;
    if (reqTo.error || reqFrom.error) return `Error!`;
    if (reqTo.data)
    {
        console.log(reqTo.data);

    }
    if (reqFrom.data)
    {
        console.log(reqFrom.data);
    }

    if (reqTo.data && reqFrom.data)
    {
        console.log(reqFrom.data);
        console.log(reqTo.data);
        console.log('TOTO');
        context.value = context.amount * (reqTo.data.targetPricePerDay.price / reqFrom.data.targetPricePerDay.price);
    }

    console.log(reqFrom.data);
    console.log(reqTo.data);


    return <div hidden={!context.result} className={styles.container}>At the date of {context.date.toISOString().slice(0,10)},{context.amount} {context.from} is egal to {context.value} {context.to}.</div>
}
