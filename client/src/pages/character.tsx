import React from "react"
import {gql, useQuery} from '@apollo/client';
import { useParams } from "react-router-dom";

const GET_CHARACTER = gql`
    query getCharacter($characterId: ID!) {
        character(id: $characterId) {
            name
            birth_year
            height
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
}`;

const CharacterPage: React.FC = () => {
    const {characterId} = useParams();
    const { loading, error, data} = useQuery(GET_CHARACTER,{
        variables: { characterId }
    });

    if(loading) {
        return <div>Loading...</div>
    };

    if(error) {
        return <div>{error.message}</div>
    }
    return <div className="grid grid-cols-4 gap-4 ">
        {JSON.stringify(data) }
    </div>
};

export default CharacterPage;