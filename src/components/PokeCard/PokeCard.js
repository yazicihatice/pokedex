import './pokecard.css';

const PokeCard = (props) => {

      const {
        speciesData: {
            base_happiness='-',
            capture_rate='-',
            color: {name: colorName = 'green'} = {},
            habitat: {name: habitatName = '-'} = {},
            generation: {name: generationName = '-'} = {},
            growth_rate: {name: growthRate = '-'} = {},
        } = {},
        pokemonData: {
            weight,
            height,
            name
        } = {},
        imageSource
      } = props;

             
      return (
        <div className={`poke-card-container ${colorName+'-card-container'}`}>
            <div className = 'pokemon-card-image-wrapper'>
                        <img src= {imageSource} width={200} height={200}/>
            </div>
           <div className='poke-card-row-wrapper'> 
            <div className='poke-card-field-title-wrapper'>
              <span className='poke-card-field-title poke-card-field-title-left'>Base Happiness</span>  
              <span className='poke-card-field-title poke-card-field-title-right'>Capture Rate</span>  
            </div>
            <div className='poke-card-info-field-wrapper'>
              <div className='poke-card-info-field'>{base_happiness}</div>
              <div className='poke-card-info-field'>{capture_rate}</div>
            </div>
          </div>

          <div className='poke-card-row-wrapper'>
            <div className='poke-card-field-title-wrapper'>
              <span className='poke-card-field-title poke-card-field-title-left'>Habitat</span>  
              <span className='poke-card-field-title poke-card-field-title-right'>Color</span>  
            </div>
            <div className='poke-card-info-field-wrapper'>
              <div className='poke-card-info-field'>{habitatName}</div>
              <div className='poke-card-info-field'>{colorName}</div>
            </div> 
          </div>    

          <div className='poke-card-row-wrapper'>
            <div className='poke-card-field-title-wrapper'>
              <span className='poke-card-field-title poke-card-field-title-left'>Growth Rate</span>  
              <span className='poke-card-field-title poke-card-field-title-right'>Generation Name</span>  
            </div>
            <div className='poke-card-info-field-wrapper'>
              <div className='poke-card-info-field'>{growthRate}</div>
              <div className='poke-card-info-field'>{generationName}</div>
            </div> 
          </div>

          <div className='poke-card-row-wrapper'>
            <div className='poke-card-field-title-wrapper'>
              <span className='poke-card-field-title poke-card-field-title-left'>Weight</span>  
              <span className='poke-card-field-title poke-card-field-title-right'>Height</span>  
            </div>
            <div className='poke-card-info-field-wrapper'>
              <div className='poke-card-info-field'>{weight}</div>
              <div className='poke-card-info-field'>{height}</div>
            </div> 
          </div>         
        </div>
      );
}
  
export default PokeCard;