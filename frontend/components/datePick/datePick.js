import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppContext } from "../../context/state";


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function datePick (){

    const [context, setContext] = useAppContext();

    return (
        <DatePicker selected={context.selectedDate} onChange={(date) => setContext({ selectedDate : date })} />
    );
};
