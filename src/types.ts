export interface Show {
    show: {
     name: string;
     id: string;
    }
}

export interface IShow {
    name: string;
    id: string;
    image?: {
        medium: string;
    };
    language?: string;
    premiered?: string;
}