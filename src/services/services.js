import axios from "axios";
import instance from "../axiosConfig";

export const getPokemonList = async (limit, offset) => {
  try {
    const response = await instance.get("pokemon", {
      params: {
        limit,
        offset,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonInfo = async (id) => {
  return instance.get(`pokemon/${id}`);
};

export const getPokemonSpeciesInfo = async (pokemonName) => {
  return instance.get(`pokemon-species/${pokemonName}`);
};

// export const getAllPokemonInfo = async (pokemonName, id) => {
//   const servicesArray = [instance.get(`pokemon-species/${pokemonName}`)];
//   if (id) {
//     servicesArray.push(instance.get(`pokemon/${id}`));
//   }
//   const [response1, response2] = await axios.all(servicesArray);
//   const { data: speciesResult } = response1;
//   const { data: pokemonResult } = response2;

//   return { speciesResult, pokemonResult };
// };

export const getEvolutionChainData = async (chainId) => {
  const { data: pokemonEvolutionData } = await instance.get(
    `evolution-chain/${chainId}`
  );

  return pokemonEvolutionData;
};
