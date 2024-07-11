import { useEffect, useState } from 'react';
import { type Character } from '../interfaces';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { _sessionStorage as ss } from '../helpers/util';
import { GET_CHARACTER } from '../queries';

const useCharacter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { characterId, name: characterName } = useParams();
  const defaultCharacter = {
    name: '',
    birth_year: '',
    height: '',
    url: '',
    films: [],
    starships: [],
    vehicles: [],
    planet: { name: '', climate: '', terrain: '' },
  };
  const [characterData, setCharacterData] =
    useState<Character>(defaultCharacter);

  useEffect(() => {
    // Populating character data from sessionStorage if present (client side caching)
    const existingCharacterData = ss.getWithExpiry(`character-${characterId}`);
    if (existingCharacterData !== null) {
      setCharacterData(<Character>existingCharacterData);
    }
  }, [characterId]);

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    skip: !!characterData?.name,
    variables: { characterId },
  });

  useEffect(() => {
    if (data?.character) {
      setCharacterData(data?.character);
      ss.setWithExpiry(`character-${characterId}`, data.character);
    }
  }, [data]);

  // This useEffect is specifically written to sync url with character name when routing happened via
  // left right carousel button as the button only update the id(counter) in url not name
  useEffect(() => {
    if (characterData?.name) {
      const actualCharacterName: string = characterData?.name
        .replace(/ /g, '-')
        .toLowerCase();
      if (characterName !== actualCharacterName) {
        navigate(`/character/${actualCharacterName}/${characterId}`, {
          replace: true,
        });
      }
    }
  }, [pathname, characterData]);

  const showLoader = loading || !characterData?.name;
  const characterImage = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`;

  const handleLeftArrow: (event: React.MouseEvent<HTMLElement>) => void = e => {
    const characterId = e.currentTarget.dataset.characterid || '1';
    navigate(`/character/random/${Number(characterId) - 1}`);
  };

  const handleRightArrow: (
    event: React.MouseEvent<HTMLElement>,
  ) => void = e => {
    const characterId = e.currentTarget.dataset.characterid || '1';
    navigate(`/character/random/${Number(characterId) + 1}`);
  };

  return {
    handleLeftArrow,
    handleRightArrow,
    showLoader,
    error,
    characterData,
    characterImage,
  };
};

export default useCharacter;
