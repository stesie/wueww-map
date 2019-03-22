import './App.css';

import React, { Component } from 'react';
import { Query } from 'react-apollo';

import logo from './logo.svg';
import Session from './model/Session';
import { FETCH_SESSIONS } from './queries';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Hallo Welt</h1>
                <ul>
                    <Query<{ sessions: Session[] }> query={FETCH_SESSIONS}>
                        {result => {
                            return result.data && result.data.sessions
                                ? result.data.sessions.map(session => <li key={session.key}>{session.title}</li>)
                                : null;
                        }}
                    </Query>
                </ul>
            </div>
        );
    }
}

export default App;
