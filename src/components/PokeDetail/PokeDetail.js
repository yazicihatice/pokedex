import React from "react";
import { 
  getEvolutionChainData,
  getPokemonInfo,
  getPokemonSpeciesInfo,
} from "../../services/services";
import Moves from "../Moves/Moves";
import PokeCard from "../PokeCard/PokeCard";
import PokeEvolution from "../PokeEvolution/PokeEvolution";
import StatChart from "../StatChart/StatChart";
import { MAX_STAT_VALUE } from "../../constants";
import "./pokedetail.css";
import { isEmpty } from "../../utils";
import Spinner from "../Spinner/Spinner";

const chunkCount = 15;

class PokeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: {},
      statChartData: [],
      speciesData: {
        evolution_chain: {
          url: "",
        },
      },
      loading:true
    };
  }

  async componentDidMount() {
    const {
      pokemonInfo: { name, id } = {},
      pokemonList,
    } = this.props.location.state;

    let speciesResult = {};
    let pokemonResult = {};
    try {
      const { data } = await getPokemonSpeciesInfo(name);  
      speciesResult = data;
    } catch (error) {
      console.error('Could not fetch species info!');
    }
    try {
      const { data } = await getPokemonInfo(id);
      pokemonResult = data;
    } catch (error) {
      console.error('Could not fetch pokemon info!');
    }

    const getEvolutionChainId = (thePath) =>
      thePath && thePath.split("/")[thePath.split("/").length - 2];
    const evolutionChainId = getEvolutionChainId(
      speciesResult.evolution_chain?.url
    );

    const evolutionChainDataFromApi = (evolutionChainId && await getEvolutionChainData(
      evolutionChainId
    )) || {};

    const evolutionArr = this.parseEvolutionData(
      evolutionChainDataFromApi.chain
    );
    const evolutionDataToShow = pokemonList.filter((pokemon) =>
      evolutionArr.includes(pokemon.name)
    );

    const statChartData = this.parseStatChartData(pokemonResult.stats);

    this.setState({
      speciesData: speciesResult,
      pokemonData: pokemonResult,
      evolutionData: evolutionDataToShow,
      statChartData,
      loading: false
    });
  }

  parseEvolutionData = (evolutionChain) => {
    const evolutionArr = [];
    if (evolutionChain) {
      let {
        species: { name },
        evolves_to,
      } = evolutionChain;
      evolutionArr.push(name);
  
      while (evolves_to.length !== 0) {
        const {
          species: { name },
        } = evolves_to[0];
        evolutionArr.push(name);
        evolves_to = evolves_to[0].evolves_to;
      }
    }
    return evolutionArr;
  };

  parseStatChartData = (stats) => {
    let statChartArr = [];

    if (stats) {
      for (let i = 0; i < stats.length; i++) {
        const {
          base_stat,
          stat: { name },
        } = stats[i];
  
        statChartArr[i] = {
          value: base_stat,
          name,
          maxValue: MAX_STAT_VALUE,
        };
      }
  
    }
    
    return statChartArr;
  };

  render() {
    const {
      speciesData,
      pokemonData,
      evolutionData,
      statChartData,
      loading
    } = this.state;
    const {
      pokemonInfo: { imageSource, name } = {},
    } = this.props.location.state;

    if(loading) return <Spinner/>;

    return (
      <>
        <div className="pokemon-list-screen-header">{name}</div>
        <div className="pokemon-detail-wrapper">
          <PokeCard
            speciesData={speciesData}
            pokemonData={pokemonData}
            imageSource={imageSource}
          />
          {!isEmpty(pokemonData.moves) && <Moves movesArr={pokemonData.moves} />}
          {!isEmpty(statChartData) && <StatChart statChartData={statChartData} chunkCount={chunkCount} />}
          {!isEmpty(evolutionData) && <PokeEvolution evolutionData={evolutionData} />}
        </div>
      </>
    );
  }
}

export default PokeDetail;
