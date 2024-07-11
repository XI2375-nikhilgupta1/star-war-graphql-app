import pkg from '@apollo/datasource-rest';
const { RESTDataSource } = pkg;
class CharacterAPI extends RESTDataSource {

    baseURL = 'https://swapi.info/api/';

    getCharactersForHome() {
        return this.get('people');
    }

    getCharacter(characterId) {
        return this.get(`people/${characterId}`);
    }

    getCharacterFilms(characterId) {
        return this.get
    }

    getFilm(filmId) {
        return this.get(`films/${filmId}`);
    }

    getPlanet(planetId) {
        return this.get(`planets/${planetId}`);
    }

    getStarship(starshipId) {
        return this.get(`starships/${starshipId}`);
    }

    getVehicle(vehicleId) {
        return this.get(`vehicles/${vehicleId}`);
    }

    
}

export default CharacterAPI;