import 'leaflet/dist/leaflet.css';
import './App.css';

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import Session from './model/Session';
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
                                .map(session => {
                                    if (!session.location || !session.location.lat || !session.location.lng) {
                                        return null;
                                    }

                                    const parts = session.location.name
                                        .split(/\n/)
                                        .map((x: string) => x.trim())
                                        .filter((x: string) => x);

                                    return (
                                        <Marker
                                            key={session.key}
                                            position={{ lng: session.location.lng, lat: session.location.lat }}
                                        >
                                            <Popup>
                                                <h3 className="session title">{session.title}</h3>
                                                <p className="session host">{session.host.name}</p>
                                                {!session.host.name.trim().startsWith(parts[0].trim()) && (
                                                    <p className="session location name">{parts[0]}</p>
                                                )}
                                                <p className="session location address">{parts.slice(1).join(', ')}</p>
                                            </Popup>
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
