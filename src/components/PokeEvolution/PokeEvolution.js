import './pokeEvolution.css';

const PokeEvolution = (props) => {

    const { evolutionData: evolutionDataArr=[] } = props;

    return(<div className='pokemon-evolution-panel-wrapper'>
        {evolutionDataArr.map((evolutionPokemon, i) => {

                let pokeImage = <div key = {i} className = 'pokemon-evolution-image'>
                            <img src= {evolutionPokemon.imageSource} width={100} height={100}/>
                    </div> 

                if(i >= evolutionDataArr.length-1){
                    return pokeImage;
                } else {
                    return<> 
                         {pokeImage}
                         <div className='next-icon'></div>
                    </>
                    
                }    
         }         
        )} 
       </div>
    );
}

export default PokeEvolution;