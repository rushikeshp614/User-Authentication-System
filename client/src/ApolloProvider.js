
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)