import "./pokeEvolution.css";
import React from "react";

const PokeEvolution = (props) => {
  const { evolutionData: evolutionDataArr = [] } = props;

  return (
    <div className="pokemon-evolution-panel-wrapper">
      {evolutionDataArr.map((evolutionPokemon, i) => {
        let pokeImage = (
          <div key={i} className="pokemon-evolution-image">
            <img
              src={evolutionPokemon.imageSource}
              alt="pokemonImage"
              width={100}
              height={100}
            />
          </div>
        );
        return i > evolutionDataArr.length ? (
          pokeImage
        ) : (
          <div key={`${i}-next-icon`}>
            {pokeImage}
            <div className="next-icon"></div>
          </div>
        );
      })}
    </div>
  );
};

export default PokeEvolution;
