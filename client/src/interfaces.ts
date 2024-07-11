export interface CharacterHome {
  name: string;
  birth_year: string;
  height: string;
  url: string;
}
export interface Character extends CharacterHome {
  films: Film[];
  starships: Starship[];
  vehicles: Vehicle[];
  planet: Planet;
}

export interface Error {
  message: string;
}

export interface Planet {
  climate: string;
  name: string;
  terrain: string;
}
export interface Transport {
  cost_in_credits: string;
  model: string;
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
