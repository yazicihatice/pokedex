import instance from "../axiosConfig";

export const getPokemonList = (limit, offset) => {
    return instance.get("pokemon", {
      params: {
        limit,
        offset,
      },
    });
};

export const getPokemonInfo = (id) => {
  return instance.get(`pokemon/${id}`);
};

export const getPokemonSpeciesInfo = (pokemonName) => {
  return instance.get(`pokemon-species/${pokemonName}`);
};

export const getEvolutionChainData = (chainId) => {
  return instance.get(`evolution-chain/${chainId}`);
};
