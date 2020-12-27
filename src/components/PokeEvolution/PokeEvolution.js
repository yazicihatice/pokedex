import "./pokeEvolution.css";
import React from "react";

const PokeEvolution = (props) => {
  const { evolutionData: evolutionDataArr = [] } = props;

  return (
    <div className="pokemon-evolution-panel-wrapper">
      {evolutionDataArr.map((evolutionPokemon, i) => {
        debugger;
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
        return i+1 >= evolutionDataArr.length ? (
          pokeImage
        ) : (<>
            {pokeImage}
          <div className="next-icon"></div>
          </>
        );
      })}
    </div>
  );
};

export default PokeEvolution;
