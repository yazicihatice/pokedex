import React from "react";
import "./pokemonlist.css";
import PokeCardListItem from "./PokeCardListItem";
import { getPokemonList } from "../../services/services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { LIMIT } from "../../constants";

class PokeCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      offset: 0,
      pageCount: 0,
      collectionData: {},
    };
  }

  componentDidMount() {
    const collectionData =
      JSON.parse(localStorage.getItem("myCollection")) || {};

    this.setState({ collectionData }, () => {
      this.loadPokemonListFromApi();
    });
  }

  loadPokemonListFromApi = () => {
    getPokemonList(LIMIT, this.state.offset).then((resp) => {
      let pokemonList = resp.results;
      let pokemonId;

      const getLastItem = (thePath) =>
        thePath.split("/")[thePath.split("/").length - 2]; // TODO ortaklanabilir bu fonksiyon

      for (let i = 0; i < LIMIT; i++) {
        pokemonId = getLastItem(pokemonList[i].url); // TODO son sayfada hata veriyor handle et
        pokemonList[
          i
        ].imageSource = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
        pokemonList[i].id = pokemonId;
      }

      this.setState({
        pokemonList,
        pageCount: Math.ceil(resp.count / LIMIT),
      });
    }); 
  };

  handlePageClick = (data) => {
    const selected = data.selected;
    const offset = Math.ceil(selected * LIMIT);

    this.setState({ offset }, () => {
      this.loadPokemonListFromApi();
    });
  };

  addPokemonToCollection = (pokemonInfo) => {
    const newPokemonForCollection = {
      [pokemonInfo.id]: pokemonInfo,
    };

    let collectionData = localStorage.getItem("myCollection");
    collectionData = collectionData === null ? {} : JSON.parse(collectionData);

    if (collectionData[pokemonInfo.id] !== undefined) {
      return;
    }

    localStorage.setItem(
      "myCollection",
      JSON.stringify({ ...collectionData, ...newPokemonForCollection })
    );
    this.setState({
      collectionData: { ...collectionData, ...newPokemonForCollection },
    });
  };

  render() {
    const { pokemonList } = this.state;

    return (
      <>
        <div className="pokemon-list-screen-header">POKEDEX</div>
        <div className={"pokemon-list-container"}>
          {pokemonList.map((pokemon, index) => (
            <PokeCardListItem
              pokemon={pokemon}
              pokemonList={pokemonList}
              addPokemonToCollection={this.addPokemonToCollection}
              collectionData={this.state.collectionData}
              index={index}
            />
          ))}
        </div>
        <div className="pokemon-list-pagination">
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </>
    );
  }
}

export default PokeCardList;
