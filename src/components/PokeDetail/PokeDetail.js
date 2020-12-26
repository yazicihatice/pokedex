import React, { Component } from 'react';
import { getAllPokemonInfo, getEvolutionChainData } from '../../services/services';
import Moves from '../Moves/Moves';
import PokeCard from '../PokeCard/PokeCard';
import PokeEvolution from '../PokeEvolution/PokeEvolution';
import StatChart from '../StatChart/StatChart';
import { MAX_STAT_VALUE } from '../../constants';
import './pokedetail.css';

const chunkCount = 15;

class PokeDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          pokemonData: {},
          statChartData:[],
          speciesData: {
            evolution_chain: {
                url: ''
            }
          }
        }
      };
    
    async componentDidMount(){
        const {pokemonInfo: {name} = {}, pokemonList} = this.props.location.state;
    
        const {speciesResult, pokemonResult} = await getAllPokemonInfo(name);

        const getEvolutionChainId = thePath => thePath.split('/')[thePath.split('/').length - 2];  
        const evolutionChainId = getEvolutionChainId(speciesResult.evolution_chain?.url);

        const evolutionChainDataFromApi = await getEvolutionChainData(evolutionChainId);

        const evolutionArr = this.parseEvolutionData(evolutionChainDataFromApi.chain);
        const evolutionDataToShow = pokemonList.filter(pokemon => evolutionArr.includes(pokemon.name));// TODO eldeki listenin dışında olduğunda bilgiye ulaşılmıyor tekrar servis çağrısı gerekebilir

        const statChartData = this.parseStatChartData(pokemonResult.stats);

        this.setState({
          speciesData: speciesResult,
          pokemonData: pokemonResult,
          evolutionData: evolutionDataToShow,
          statChartData
        });
    
    };

    parseEvolutionData = (evolutionChain) => {
        const evolutionArr=[];
        let {species: {name}, evolves_to} = evolutionChain;
        evolutionArr.push(name);

        while(evolves_to.length !== 0){
            const { species : {name}} = evolves_to[0];
            evolutionArr.push(name);
            evolves_to = evolves_to[0].evolves_to;
        }
        
        return evolutionArr;

    }   

    parseStatChartData = (stats) => {
        let statChartArr = [];

        for(let i = 0 ; i<stats.length ; i++) {
            const {base_stat, stat: {name}} = stats[i];

            statChartArr[i] = {
                value: base_stat,
                name,
                maxValue: MAX_STAT_VALUE
            };
        };

        return statChartArr;
    }

    render() {
        const {speciesData, pokemonData, evolutionData, statChartData} = this.state;
        const {pokemonInfo: { imageSource, name } = {}} = this.props.location.state;

        return(<> 
              <div className='pokemon-list-screen-header'>{name}</div>
               <div className='pokemon-detail-wrapper'>
                    <PokeCard speciesData={speciesData} 
                            pokemonData={pokemonData} 
                            imageSource={imageSource}/>
                        <Moves movesArr={pokemonData.moves}/>    
                        <StatChart statChartData={statChartData} chunkCount={chunkCount}/>  
    
                    <PokeEvolution evolutionData={evolutionData}/>  
               </div>     
               </> 
        )
    }
}
  
export default PokeDetail;