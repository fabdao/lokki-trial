import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const [context, setContext] = useState({selectedDate : new Date()});

    return (
        <AppContext.Provider value={[context, setContext]}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
