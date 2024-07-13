import gql from 'graphql-tag';

const typeDefs = gql`
    type Query {
    "query to get all characters"
        charactersForHome: [Character]
        character(id: ID!): Character
    }
    
    type Character  {
        name: String!
        birth_year: String!
        height: String
        url: String!
        films: [Film!]!
        planet: Planet!
        vehicles: [Vehicle!]!
        starships: [Starship!]!
    }
    
    type Film {
        title: String!
        episode_id: String!
    }

    type Planet {
        name: String!
        climate: String!
        terrain: String!
    }
    
    type Vehicle {
        name: String!
        model: String!
        vechile_class: String
        cost_in_credits: String!
    }

    type Starship {
        name: String!
        model: String!
        starship_class: String
        cost_in_credits: String!
    }
`;

export default typeDefs;
