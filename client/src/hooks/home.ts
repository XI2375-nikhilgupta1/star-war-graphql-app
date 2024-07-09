import { useEffect, useState } from 'react';
import { Character, Error } from '../interfaces';
import { useQuery } from '@apollo/client';
import {useNavigate} from 'react-router-dom';
import { _sessionStorage as ss} from '../helpers/util';
import { GET_CHARACTERS } from '../queries';


const useHome = () => {
    const navigate = useNavigate();
    
    // Populating home data for sessionStorage if present (client side caching)
    const existingHomePageCharacters:Character[] = ss.getWithExpiry('charactersForHome') || [];

    const [charactersList,  setCharacterList] = useState<Character[]>(existingHomePageCharacters);
    const { loading, error, data} : {loading: boolean, error?: Error, data: any} = useQuery<Character[]>(GET_CHARACTERS, {skip: !!charactersList.length});
    
    useEffect(()=>{
        if(data?.charactersForHome){
            setCharacterList(data.charactersForHome);
            ss.setWithExpiry('charactersForHome', data.charactersForHome)
        }
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