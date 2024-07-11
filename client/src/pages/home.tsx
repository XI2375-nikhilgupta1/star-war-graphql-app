import React from 'react';
import { type Character } from '../interfaces';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import useHome from '../hooks/home';

const Home: React.FC = () => {
  const { charactersList, loading, error, handleOnSelect } = useHome();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex h-screen justify-center items-center home-page-container">
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <ReactSearchAutocomplete
          className="react-autocomplete"
          items={charactersList}
          onSelect={handleOnSelect}
          autoFocus
          formatResult={(item: Character) => item.name}
        />
      )}
    </div>
  );
};

export default Home;
