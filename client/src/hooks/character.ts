import { useEffect, useState } from 'react';
import { type Character } from '../interfaces';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { _sessionStorage as ss } from '../helpers/util';
import { GET_CHARACTER } from '../queries';

interface characterHookData {
  handleLeftArrow: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleRightArrow: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  showLoader: boolean;
  error: Error | undefined;
  characterData: Character;
  characterImage: string;
}

const useCharacter: () => characterHookData = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { characterId = '', name: characterName = '' } = useParams();
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
    const existingCharacterData: Character | null = ss.getWithExpiry(
      `character-${characterId}`,
    );
    if (existingCharacterData !== null) {
      setCharacterData(existingCharacterData);
    }
  }, [characterId]);

  const {
    loading,
    error,
    data: { character },
  } = useQuery(GET_CHARACTER, {
    skip: characterData.name !== '',
    variables: { characterId },
  });

  useEffect(() => {
    const characterData: Character = character;
    setCharacterData(characterData);
    ss.setWithExpiry(`character-${characterId}`, characterData);
  }, [character]);

  // This useEffect is specifically written to sync url with character name when routing happened via
  // left right carousel button as the button only update the id(counter) in url not name
  useEffect(() => {
    if (characterData.name !== '') {
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

  const showLoader: boolean = loading ?? characterData.name !== '';
  const characterImage = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`;

  const handleLeftArrow: (event: React.MouseEvent<HTMLElement>) => void = e => {
    const characterId = e.currentTarget.dataset.characterid ?? '1';
    navigate(`/character/random/${Number(characterId) - 1}`);
  };

  const handleRightArrow: (
    event: React.MouseEvent<HTMLElement>,
  ) => void = e => {
    const characterId = e.currentTarget.dataset.characterid ?? '80';
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
