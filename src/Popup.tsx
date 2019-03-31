import React, { Fragment, FunctionComponent } from 'react';
import * as Leaflet from 'react-leaflet';

import { formatDate } from './dateUtil';
import Session, { startTimeComparator } from './model/Session';

const Popup: FunctionComponent<{ sessions: Session[] }> = ({ sessions }) => {
    const parts = sessions[0]
        .location!.name.split(/\n/)
        .map((x: string) => x.trim())
        .filter((x: string) => x);

    return (
        <Leaflet.Popup>
            <p className="session location name">{parts[0]}</p>
            <p className="session location address">{parts.slice(1).join(', ')}</p>
            <hr />
            {[...sessions].sort(startTimeComparator).map((session, index) => (
                <Fragment key={index}>
                    <h3 className="session title">{session.title}</h3>
                    <p className="session host">
                        {session.host.name} @ {formatDate(session.start)}
                    </p>
                </Fragment>
            ))}
        </Leaflet.Popup>
    );
};

export default Popup;
