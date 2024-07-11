import { useEffect, useState } from 'react';
import { type Character, type Error } from '../interfaces';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { _sessionStorage as ss } from '../helpers/util';
import { GET_CHARACTERS } from '../queries';

const useHome = () => {
  const navigate = useNavigate();

  // Populating home data for sessionStorage if present (client side caching)
  const existingHomePageCharacters: Character[] =
    ss.getWithExpiry('charactersForHome') ?? [];

  const [charactersList, setCharacterList] = useState<Character[]>(
    existingHomePageCharacters,
  );
  const {
    loading,
    error,
    data,
  }: { loading: boolean; error?: Error; data: object | undefined } = useQuery<
    Character[]
  >(GET_CHARACTERS, {
    skip: !(charactersList.length === 0),
  });

  useEffect(() => {
    if (data !== undefined) {
      const charactersData: Character[] = data.charactersForHome;
      setCharacterList(charactersData);
      ss.setWithExpiry('charactersForHome', charactersData);
    }
  }, [data]);

  const handleOnSelect = (item: Character) => {
    const characterId = item.url.split('/people/')[1];
    navigate(
      `/character/${item.name.replace(/ /g, '-').toLocaleLowerCase()}/${characterId}`,
    );
  };

  return {
    charactersList,
    loading,
    error,
    data,
    handleOnSelect,
  };
};

export default useHome;
