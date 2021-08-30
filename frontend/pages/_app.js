import '../styles/global.css'
import { AppWrapper } from '../context/state'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});


export default function App({ Component, pageProps }) {
    return <ApolloProvider client={client}>
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    </ApolloProvider>
}
