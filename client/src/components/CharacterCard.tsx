import React from 'react';
import { Link } from 'react-router-dom';
import { type Character } from '../interfaces';

const CharacterCard: React.FC<Character> = ({
  name,
  birth_year: birthYear,
  height,
  url,
}) => {
  const id: string = url.split('people/')[1];

  return (
    <Link
      to={`/character/${id}`}
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Birth Year: {birthYear} | Height: {height}
      </p>
    </Link>
  );
};

export default CharacterCard;
