import {MAX_STAT_VALUE} from '../constants';

export const isEmpty = (value) => {
    if (!value) {
        return true;
    }
    if (typeof value === Object) {
        return Object.keys(value).length <= 0;
    }
    if (Array.isArray(value)) {
        return value.length <= 0;
    }
    
};

export const parseEvolutionData = (evolutionChain) => {
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

export const parseStatChartData = (stats) => {
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

export const checkIfTouchDevice = () => {
    return window.matchMedia("(pointer: coarse)").matches;
};

export const getEvolutionChainId = (speciesResult) => {
    const thePath = speciesResult.evolution_chain?.url;

    return thePath && thePath.split("/")[thePath.split("/").length - 2];
};