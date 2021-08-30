import styles from './result.module.css'
import utilStyles from '../../styles/utils.module.css'
import {useAppContext} from '../../context/state';

export default function Result() {
    const [context] = useAppContext();
    console.log(context);

    return <div className={styles.container}>At the date of {context.date.toISOString().slice(0,10)},{context.amount} {context.from} is egal to {context.value} {context.to}.</div>
}
