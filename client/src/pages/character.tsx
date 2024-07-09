import React from "react"
import {gql, useQuery} from '@apollo/client';
import { useParams } from "react-router-dom";
import { Film } from "../interfaces";
import TransPortList from "../components/TransportList";
import {ReactComponent as CarSVG}  from '../assets/car.svg';
import {ReactComponent as StarshipSVG}  from '../assets/starfighter.svg';
import {ReactComponent as FilmSVG}  from '../assets/film.svg';



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

    if(loading){
        return <div className="flex h-screen justify-center items-center">Loading...</div>
    }

    if(error) {
        return <div>{error.message}</div>
    }

    const {name, birth_year,height, planet: {climate, name: planetName, terrain}, films, vehicles, starships}= data.character;

    return <div className="flex h-screen justify-center items-center">
        {
            <div className="block w-3/5 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex gap-8">
                <div className="w-1/2 text-white text-md capitalize">
                    <img className="rounded" src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`} />
                    <h3 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">{name}</h3>
                    <p>Birth Year: {birth_year} | Height: {height}</p>
                    <p>Climate: {climate}</p>
                    <p className="text-sm">Planet Name: {planetName}</p>
                    <p className="text-sm">Terrain: {terrain}</p>
                    
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