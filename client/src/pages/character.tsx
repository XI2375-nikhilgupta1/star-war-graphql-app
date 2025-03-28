import React from 'react';
import { useParams } from 'react-router-dom';
import { type Film } from '../interfaces';
import TransPortList from '../components/TransportList';
import { ReactComponent as CarSVG } from '../assets/car.svg';
import { ReactComponent as StarshipSVG } from '../assets/starfighter.svg';
import { ReactComponent as FilmSVG } from '../assets/film.svg';
import useCharacter from '../hooks/character';
import Loader from '../components/global/Loader';

const CharacterPage: React.FC = () => {
  const { characterId } = useParams();
  const {
    handleRightArrow,
    handleLeftArrow,
    showLoader,
    error,
    characterData,
    characterImage
  } = useCharacter();

  if (error != null) {
    return <div>{error.message}</div>;
  }

  if (showLoader) {
    return (
      <div className="flex justify-center items-center h-screen character-page loader-container">
        <div className="md:w-3/5 sm:w-full character-container justify-center items-center p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 flex gap-8 relative">
          <Loader />
        </div>
      </div>
    );
  }

  const { name, birth_year, height, planet, films, vehicles, starships } =
    characterData;
  const hideLeftButton = characterId === '1';

  return (
    <div className="flex justify-center items-center h-screen character-page">
      <div className="character-container sm:w-full md:w-3/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 flex sm:flex-wrap md:flex-nowrap  gap-8 relative">
        {!hideLeftButton && (
          <button
            role="button"
            aria-label="left"
            name="left"
            data-characterid={characterId}
            onClick={handleLeftArrow}
            className="absolute left-icon carousel-btn shadow"
          >
            &#8592;
          </button>
        )}
        <button
          role="button"
          aria-label="right"
          name="right"
          data-characterid={characterId}
          onClick={handleRightArrow}
          className="absolute right-icon carousel-btn shadow"
        >
          &#8594;
        </button>
        <div className="w-2/5 text-black text-md capitalize character-container__image">
          <img className="rounded" alt={name} src={characterImage} />
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-black mt-2">
            {name}
          </h3>
          <p className="text-sm">
            Birth Year: {birth_year} | Height: {height}
          </p>
          <p className="text-sm">Climate: {planet.climate}</p>
          <p className="text-sm">Planet Name: {planet.name}</p>
          <p className="text-sm">Terrain: {planet.terrain}</p>
        </div>
        <div className="w-3/5 text-white capitalize leading-8 text-lg overscroll-auto character-container__description">
          {films.length > 0 && (
            <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
              <div className="text-xl text-center mt-2">
                <div className="flex items-center gap-4 mb-2">
                  <FilmSVG height={24} width={24} color="#000" />
                  <span>Films</span>
                </div>
                <ul className="list-disc ml-4 text-left">
                  {films.map(({ title, episode_id }: Film) => (
                    <li className="text-sm" key={title}>
                      {title} -{' '}
                      <span className="text-xs gray-600">
                        Episode: {episode_id}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {vehicles.length > 0 && (
            <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
              <div className="flex items-center gap-4">
                <CarSVG height={24} width={24} color="#000" />
                <span>Vehicles</span>
              </div>
              <TransPortList transportList={vehicles} />
            </div>
          )}
          {starships.length > 0 && (
            <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
              <div className="flex items-center gap-4">
                <StarshipSVG height={24} width={24} color="#000" />
                <span>Starships</span>
              </div>
              <TransPortList transportList={starships} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterPage;
