export interface Character {
        id: number; // I assume ID is defined elsewhere
        name: string;
        birth_year: string;
        height: number;
        url: string;
}

export interface Error {
        message: string
}

export interface Transport {
        cost_in_credits: string;
        model: string
        name: string;
}
export interface Vehicle extends Transport {
        vechile_class: string;
}

export interface Starship extends Transport {
        starship_class: string;
}

export interface Film {
        title: string;
        episode_id: string;
}