import React, { FunctionComponent } from 'react';
import * as Leaflet from 'react-leaflet';

import Session from './model/Session';

const Popup: FunctionComponent<Session> = session => {
    const parts = session
        .location!.name.split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    return (
        <Leaflet.Popup>
            <h3 className="session title">{session.title}</h3>
            <p className="session host">{session.host.name}</p>
            {!session.host.name.trim().startsWith(parts[0].trim()) && (
                <p className="session location name">{parts[0]}</p>
            )}
            <p className="session location address">{parts.slice(1).join(', ')}</p>
        </Leaflet.Popup>
    );
};

export default Popup;
