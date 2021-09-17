import gql from 'graphql-tag';

export const FETCH_SESSIONS = gql`
    query FETCH_SESSIONS {
        sessions @rest(type: "Session", path: "/export/session.json") {
            id
            start
            end
            cancelled
            title
            host @type(name: "Host") {
                name
            }
            location @type(name: "Location") {
                name
                lat
                lng
            }
        }
    }
`;
