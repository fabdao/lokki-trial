import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './datePick.module.css'
import { useAppContext } from "../../context/state";

export default function datePick (){

    const [context, setContext] = useAppContext();

    return (
        <div>
            <DatePicker className={styles.container}
                        selected={context.date}
                        onChange={(date) => setContext({...context, date: date })}
                        inline
            />
        </div>

    );
}
