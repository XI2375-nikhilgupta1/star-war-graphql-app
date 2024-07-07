import React from "react"
import {gql, useQuery} from '@apollo/client';
import CharacterCard from "../components/CharacterCard";
import { Character } from "../interfaces";

const CHARACTERS = gql`
    query getCharacters {
        charactersForHome {
            name
            birth_year
            height
            url
    }
}`;

const Home: React.FC = () => {
    const { loading, error, data} = useQuery(CHARACTERS);

    if(loading) {
        return <div>Loading...</div>
    };
    console.log(error)
    if(error) {
        return <div>{error.message}</div>
    }
    return <div className="grid grid-cols-4 gap-4 ">
        {
            data.charactersForHome?.map((character: Character)=>(<CharacterCard {...character}/>))
        }
    </div>
};

export default Home;