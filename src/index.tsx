import './index.css';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';

import App from './App';
import Session from './model/Session';
import { FETCH_SESSIONS } from './queries';
import * as serviceWorker from './serviceWorker';

const restLink = new RestLink({
    uri: 'https://wueww.github.io/',
    responseTransformer: async response => response.json().then(({ sessions }: { sessions: any }) => sessions),
});

const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
});

/*
client.query<{ sessions: Session[] }>({ query: FETCH_SESSIONS }).then(response => {
    console.log('foo', response.data.sessions);
});
*/

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
