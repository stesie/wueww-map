interface Session {
    key: string;
    start: string;
    end: string | null;
    cancelled: boolean;
    host: {
        name: string;
    };
    title: string;
    location?: {
        name: string;
        lat?: number;
        lng?: number;
    };
}

export default Session;
