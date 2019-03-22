import 'leaflet/dist/leaflet.css';

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
                            return result.data && result.data.sessions
                                ? result.data.sessions
                                      .filter(session => !session.cancelled)
                                      .map(session =>
                                          session.location && session.location.lat && session.location.lng ? (
                                              <Marker
                                                  key={session.key}
                                                  position={{ lng: session.location.lng, lat: session.location.lat }}
                                              >
                                                  <Popup>
                                                      {session.title}
                                                      <br />
                                                      by {session.host.name}
                                                  </Popup>
                                              </Marker>
                                          ) : null
                                      )
                                : null;
                        }}
                    </Query>
                </Map>
            </div>
        );
    }
}

export default App;
