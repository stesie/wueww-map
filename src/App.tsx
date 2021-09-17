import 'leaflet/dist/leaflet.css';
import './App.css';

import React, { FunctionComponent } from 'react';
import { Query } from 'react-apollo';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Session from './model/Session';
import Popup from './Popup';
import { FETCH_SESSIONS } from './queries';

const App: FunctionComponent = () => (
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
        <Map center={{ lng: 9.9602, lat: 49.7879 }} zoom={14} style={{ height: '100vh', width: '100vw' }}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Made by Rolf, <a href="impressum.html">Impressum</a>.'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Query<{ sessions: Session[] }> query={FETCH_SESSIONS}>
                {result => {
                    if (!result.data || !result.data.sessions) {
                        return null;
                    }

                    return Object.values(
                        result.data.sessions
                            .filter(session => !session.cancelled)
                            .filter(session => session.location && session.location.lat && session.location.lng)
                            .reduce(
                                (acc, session) => {
                                    const key = [session.location!.lat, session.location!.lng].join('#');
                                    return { ...acc, [key]: [...(acc[key] || []), session] };
                                },
                                {} as { [key: string]: Session[] }
                            )
                    ).map((partitionedSessions: Session[]) => (
                        <Marker
                            key={partitionedSessions[0].id}
                            position={{
                                lng: partitionedSessions[0].location!.lng!,
                                lat: partitionedSessions[0].location!.lat!,
                            }}
                        >
                            <Popup sessions={partitionedSessions} />
                        </Marker>
                    ));
                }}
            </Query>
        </Map>
    </div>
);

export default App;
