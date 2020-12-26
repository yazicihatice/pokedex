import React from 'react';
import './mycollection.css';


class MyCollection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        collectionList:{} 
    }
  };

  componentDidMount(){
    const collectionList = localStorage.getItem("myCollection") ? JSON.parse(localStorage.getItem("myCollection")) : {};
    this.setState({collectionList});
  }

    removeFromCollection = (pokemon) => {
        const selectedPokemonId = pokemon.id;
        const collectionList = JSON.parse(localStorage.getItem('myCollection'));

        delete collectionList[selectedPokemonId];

        localStorage.setItem('myCollection', JSON.stringify(collectionList));
        this.setState({collectionList})
    };

    render(){
        const {collectionList} = this.state;
        const collectionArray = Object.values(collectionList);

        return(<>
            <div className='collection-pokemon-list-screen-header'>MY COLLECTION</div>
            <div className={'collection-pokemon-list-container'}>
               {collectionArray.length ? collectionArray.map((pokemon, i) => ( 
                     <div key={i} className={'collection-pokemon-card-list-view'}>
                        <div className="collection-pokemon-name-and-image">
                            <div className="collection-pokemon-card-name-text">{pokemon.name}</div>
                            <div className = 'collection-pokemon-list-card-image-wrapper'>
                                <img src= {pokemon.imageSource} alt='pokemonImage' width={400} height={400}/>
                            </div>  
                        </div>
                        <div className="overlay">
                                <div onClick = {() => this.removeFromCollection(pokemon)} className="icon remove-collection-icon" title="Add Collection">
                                    <i className="fa fa-minus-circle fa-xs"></i>
                                </div>
                        </div>
                    </div>  
               )): <span>You've got no pokemon in your collection :(</span>} 
            </div>
            </>
        )
    }
    
    
}
  
export default MyCollection;