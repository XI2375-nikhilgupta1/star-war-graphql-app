import React, { useEffect, useState } from "react"
import { useQuery} from '@apollo/client';
import { useParams } from "react-router-dom";
import { Character, Film } from "../interfaces";
import TransPortList from "../components/TransportList";
import {ReactComponent as CarSVG}  from '../assets/car.svg';
import {ReactComponent as StarshipSVG}  from '../assets/starfighter.svg';
import {ReactComponent as FilmSVG}  from '../assets/film.svg';
import { GET_CHARACTER } from "../queries";
import { _sessionStorage as ss} from '../helpers/util';

const CharacterPage: React.FC = () => {
    const { characterId } = useParams();

    // Populating character data from sessionStorage if present (client side caching)
    const existingCharacterData:Character = ss.getWithExpiry(`character-${characterId}`) || {};

    const [characterData, setCharacterData] = useState<Character>(existingCharacterData)
    const { loading, error, data} = useQuery(GET_CHARACTER,{
        skip: !!characterData.name,
        variables: { characterId }
    });

    useEffect(()=>{
        if(data?.character){
            setCharacterData(data?.character);
            ss.setWithExpiry(`character-${characterId}`, data.character);
            console.log('interface',data.character)
        }
    },[data]);

    if(loading || !characterData.name){
        return <div className="flex h-screen justify-center items-center">Loading...</div>
    }

    if(error) {
        return <div>{error.message}</div>
    }

    const {name, birth_year,height, planet, films, vehicles, starships } = characterData;

    return <div className="flex h-screen justify-center items-center">
        {
            <div className="block w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex gap-8">
                <div className="w-1/2 text-white text-md capitalize">
                    <img className="rounded" src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`} />
                    <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">{name}</h3>
                    <p>Birth Year: {birth_year} | Height: {height}</p>
                    <p>Climate: {planet.climate}</p>
                    <p className="text-sm">Planet Name: {planet.name}</p>
                    <p className="text-sm">Terrain: {planet.terrain}</p>
                    
                </div>
                <div className="w-1/2 text-white capitalize leading-8 text-lg overscroll-auto">
                    {films.length > 0 && <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
                    <div className="text-xl text-center mt-2">
                                <div className="flex items-center gap-4 mb-2">
                                    <FilmSVG height={24} width={24} color="#000"/>
                                    <span>Films</span>
                                    
                                </div>
                                <ul className="list-disc ml-4 text-left">
                                    {films.map(({title, episode_id}:Film)=><li className="text-sm" key={title}>
                                        {title} - <span className="text-xs gray-600">Episode: {episode_id}</span>
                                    </li>)}
                                </ul>
                            </div>
                        </div>
                    }
                    {vehicles.length > 0 && <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
                        <div className="flex items-center gap-4">
                            <CarSVG height={24} width={24} color="#000"/>
                            <span>Vehicles</span>
                        </div>
                            <TransPortList transportList={vehicles} />
                    </div>
                    }
                    {starships.length > 0 && <div className="mt-2 p-2 pb-2 bg-white border border-gray-200 rounded-lg shadow text-black">
                        <div className="flex items-center gap-4">
                            <StarshipSVG height={24} width={24} color="#000"/>
                            <span>Starships</span>
                        </div>
                            <TransPortList transportList={starships} />
                    </div>
                    } 
                    
                </div>
            </div>
        }
    </div>
};

export default CharacterPage;