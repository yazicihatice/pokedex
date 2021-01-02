import React from "react";
import ReactPaginate from "react-paginate";
import { LIMIT } from "../../constants";
import CollectionItem from "./CollectionItem";
import "./mycollection.css";

class MyCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionList: {},
      pageCount:0,
      currentPage: 0
    };
  }

  componentDidMount() {
    let collectionList = localStorage.getItem("myCollection")
      ? JSON.parse(localStorage.getItem("myCollection"))
      : {};
    const pageCount = Math.ceil(Object.keys(collectionList).length / LIMIT);
    collectionList = Object.values(collectionList).slice(this.state.currentPage, LIMIT);

    this.setState({ collectionList, pageCount });
  }

  handlePageClick = (data) => {
    const currentPage = data.selected;
    const currentIndex = Math.ceil(currentPage * LIMIT);
    const collectionList = Object.values(JSON.parse(localStorage.getItem("myCollection"))).slice(currentIndex, currentIndex + LIMIT);
    
    this.setState({
      currentPage,
      collectionList
    })
  };

  removeFromCollection = (pokemon) => {
    let { currentPage } = this.state;
    const selectedPokemonId = pokemon.id;
    const collectionList = JSON.parse(localStorage.getItem("myCollection"));
    const { [selectedPokemonId]: deletedObj, ...restOfCollectionList } = collectionList;

    const pageCount = Math.ceil(Object.keys(restOfCollectionList).length/ LIMIT);

    localStorage.setItem('myCollection', JSON.stringify(restOfCollectionList));
    let newCurrentPage;
    if (currentPage < pageCount) {
      newCurrentPage = currentPage;
    } else {
      newCurrentPage = pageCount - 1; 
    }
    this.setState({ pageCount }, () => this.handlePageClick({ selected: newCurrentPage }));
  };

  render() {
    const { collectionList } = this.state;
    const { removeFromCollection } = this;
    const collectionArray = Object.values(collectionList);

    return (
      <>
        <div className="collection-pokemon-list-screen-header">
          MY COLLECTION
        </div>
        <div className={"collection-pokemon-list-container"}>
          {collectionArray.length ? (
            collectionArray.map((pokemon) => (
              <CollectionItem pokemon={pokemon} key={pokemon.name} removeFromCollection={removeFromCollection}/>
            ))
          ) : (
            <span>You've got no pokemon in your collection.</span>
          )}
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

export default MyCollection;
