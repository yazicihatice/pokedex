import axios from "axios";
import instance from "../axiosConfig";

export const getPokemonById = async (pokemonId) => {
  try {
    const response = await instance.get(`pokemon/${pokemonId}`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

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

export const getPokemonImages = async (pokemonIds) => {
  const urls = pokemonIds.map(
    (pokemonId) =>
      `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`
  );

  try {
    const response = await axios.all(urls.map((url) => axios.get(url)));

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonSpecies = async (pokemonName) => {
  try {
    const response = await instance.get(`pokemon-species/${pokemonName}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPokemonInfo = async (pokemonName) => {
  const service1 = instance.get(`pokemon-species/${pokemonName}`);
  const service2 = instance.get(`pokemon/${pokemonName}`);

  const [response1, response2] = await axios.all([service1, service2]);
  const { data: speciesResult } = response1;
  const { data: pokemonResult } = response2;

  return { speciesResult, pokemonResult };
};

export const getEvolutionChainData = async (chainId) => {
  const { data: pokemonEvolutionData } = await instance.get(
    `evolution-chain/${chainId}`
  );

  return pokemonEvolutionData;
};
