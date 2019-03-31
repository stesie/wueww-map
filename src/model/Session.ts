export default interface Session {
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

export function startTimeComparator(a: Session, b: Session) {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
}
