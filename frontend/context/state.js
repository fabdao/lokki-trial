import { createContext, useContext, useState } from 'react';

const AppContext = createContext(   );

export function AppWrapper({ children }) {

    const [context, setContext] = useState({
        date: new Date(),
        amount: 1,
        value: 0,
        from: 'USD',
        to: 'EUR',
        result: false
    });

    return (
        <AppContext.Provider value={[context, setContext]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
