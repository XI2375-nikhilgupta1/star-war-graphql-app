const resolvers = {
    Query: {
        charactersForHome: (_, __, { dataSources }) => {
            return dataSources.characterApi.getCharactersForHome();
        },
        character: (_, { id }, { dataSources }) => {
            return dataSources.characterApi.getCharacter(id)
        }
    },
    Character: {
        films: ({ films }, _, { dataSources }) => {
            return films.map((url) => dataSources.characterApi.getFilm(url.split('films/')[1]))
        },
        vehicles: ({ vehicles }, _, { dataSources }) => {
            return vehicles.map((url) => dataSources.characterApi.getVehicle(url.split('vehicles/')[1]))
        },
        starships: ({ starships }, _, { dataSources }) => {
            return starships.map((url) => dataSources.characterApi.getStarship(url.split('starships/')[1]))
        },
        planet: ({ homeworld }, _, { dataSources }) => {
            return dataSources.characterApi.getPlanet(homeworld.split('planets')[1]);
        }
    }
}

export default resolvers