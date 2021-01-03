import React from "react";
import "./pokemonlist.css";
import PokeCardListItem from "./PokeCardListItem";
import { getPokemonList } from "../../services/services";
import ReactPaginate from "react-paginate";
import { LIMIT } from "../../constants";
import Spinner from "../Spinner/Spinner";

class PokeCardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      offset: 0,
      pageCount: 0,
      activePage: 0,
      collectionData: {},
      loading: true,
    };
  }

  componentDidMount() {
    const collectionData =
      JSON.parse(localStorage.getItem("myCollection")) || {};

    const { offset, activePage } = this.state;

    this.setState({ collectionData }, () => {
      this.loadPokemonListFromApi(offset, activePage);
    });
  }

  loadPokemonListFromApi = async (offset, activePage) => {
    try {
      const { data } = await getPokemonList(LIMIT, offset);

      let pokemonList = data.results;
      let pokemonId;

      const getLastItem = (thePath) =>
        thePath.split("/")[thePath.split("/").length - 2];

      for (let i = 0; i < pokemonList.length; i++) {
        pokemonId = getLastItem(pokemonList[i].url);
        pokemonList[
          i
        ].imageSource = `https://pokeres.bastionbot.org/images/pokemon/${pokemonId}.png`;
        pokemonList[i].id = pokemonId;
      }

      this.setState({
        pokemonList,
        pageCount: Math.ceil(data.count / LIMIT),
        offset,
        loading: false,
        activePage,
      });
    } catch (error) {
      console.error("Could not fetch pokemon list!");
    }
  };

  handlePageClick = (data) => {
    const activePage = data.selected;
    const offset = Math.ceil(activePage * LIMIT);

    this.setState({ loading: true }, () =>
      this.loadPokemonListFromApi(offset, activePage)
    );
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
    const { pokemonList, loading } = this.state;

    if (loading) return <Spinner />;

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
              key={index}
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
            forcePage={this.state.activePage}
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
