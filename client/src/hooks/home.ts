import { useEffect, useState } from 'react';
import { Character, Error } from '../interfaces';
import { gql, useQuery } from '@apollo/client';
import {useNavigate} from 'react-router-dom';


const useHome = () => {
    const navigate = useNavigate();
    const [charactersList,  setCharacterList] = useState<Character[]>([]);
    const GET_CHARACTERS = gql`
        query getCharacters {
            charactersForHome {
                name
                birth_year
                height
                url
        }
    }`;

    const { loading, error, data}:{loading: boolean, error?: Error, data: any} = useQuery<Character[]>(GET_CHARACTERS);

    useEffect(()=>{
        data?.charactersForHome && setCharacterList(data.charactersForHome);
    },[data]);

    const handleOnSelect = (item:Character) => {
        const characterId = item.url.split('/people/')[1];
        navigate(`/character/${item.name.replace(/ /g,'-').toLocaleLowerCase()}/${characterId}`)
    }
    
    
      return {
        charactersList,
        loading, 
        error,
        data,
        handleOnSelect
      }
}

export default useHome;