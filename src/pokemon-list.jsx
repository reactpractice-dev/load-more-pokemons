// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect, useState } from "react";

const PokemonList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemons([...pokemons, ...data.results]);
        setTotalCount(data.count);
        setIsLoading(false);
      });
  }, [offset]);

  const hasLoadedAllData = pokemons.length === totalCount;

  return (
    <div>
      {isLoading && <span>Loading ...</span>}
      <ul>
        {pokemons.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
      <p>
        Displaying {pokemons.length} of {totalCount} results
      </p>
      {!hasLoadedAllData && (
        <button onClick={() => setOffset(offset + 5)}>Load more</button>
      )}
    </div>
  );
};

export default PokemonList;
