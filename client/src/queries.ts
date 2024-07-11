import { gql } from '@apollo/client';
export const GET_CHARACTERS = gql`
  query getCharacters {
    charactersForHome {
      name
      birth_year
      height
      url
    }
  }
`;

export const GET_CHARACTER = gql`
  query getCharacter($characterId: ID!) {
    character(id: $characterId) {
      name
      birth_year
      height
      url
      films {
        title
        episode_id
      }
      planet {
        climate
        name
        terrain
      }
      starships {
        cost_in_credits
        model
        name
        starship_class
      }
      vehicles {
        cost_in_credits
        model
        name
        vechile_class
      }
    }
  }
`;
