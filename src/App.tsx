import 'leaflet/dist/leaflet.css';
import './App.css';

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Session from './model/Session';
import Popup from './Popup';
import { FETCH_SESSIONS } from './queries';

class App extends Component {
    render() {
        return (
            <div className="App" style={{ height: '100vh', width: '100vw' }}>
                <Map center={{ lng: 9.9602, lat: 49.7879 }} zoom={14} style={{ height: '100vh', width: '100vw' }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Query<{ sessions: Session[] }> query={FETCH_SESSIONS}>
                        {result => {
                            if (!result.data || !result.data.sessions) {
                                return null;
                            }

                            return result.data.sessions
                                .filter(session => !session.cancelled)
                                .filter(session => session.location && session.location.lat && session.location.lng)
                                .map(session => {
                                    return (
                                        <Marker
                                            key={session.key}
                                            position={{ lng: session.location!.lng!, lat: session.location!.lat! }}
                                        >
                                            <Popup {...session} />
                                        </Marker>
                                    );
                                });
                        }}
                    </Query>
                </Map>
            </div>
        );
    }
}

export default App;
