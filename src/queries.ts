import gql from 'graphql-tag';

export const FETCH_SESSIONS = gql`
    query FETCH_SESSIONS {
        sessions @rest(type: "Session", path: "fahrplan-2019/sessions.json") {
            key
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
