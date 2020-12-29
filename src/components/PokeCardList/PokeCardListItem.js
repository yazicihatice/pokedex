import React from "react";
import { Link } from "react-router-dom";
import "./pokemonlist.css";

export default class PokeCardListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false,
    };
    this.imageContainerRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { imageContainerRef } = this;

    if (
      imageContainerRef.current &&
      !imageContainerRef.current.contains(event.target)
    ) {
      this.setState({
        overlayVisible: false,
      });
    }
  };

  isTouchDevice = () => {
    return window.matchMedia("(pointer: coarse)").matches;
  };

  imageClicked = (isTouchDevice) => {
    return isTouchDevice
      ? () => {
          this.setState({ overlayVisible: true });
        }
      : () => false;
  };

  getOverLayDiv = (pokemon, isTouchDevice) => {
    const { pokemonList, collectionData, addPokemonToCollection } = this.props;

    return (
      <div className={isTouchDevice ? "overlay-touch" : "overlay"}>
        <Link
          to={{
            pathname: "/detail",
            state: { pokemonInfo: pokemon, pokemonList },
          }}
        >
          <div
            className={`icon ${
              collectionData[pokemon.id]
                ? "centered-detail-icon"
                : "detail-icon"
            }`}
            title="Pokemon Detail"
          >
            <i className="fa fa-eye fa-xs"></i>
          </div>
        </Link>
        {!collectionData[pokemon.id] && (
          <div
            onClick={() => addPokemonToCollection(pokemon)}
            className="icon add-collection-icon"
            title="Add Collection"
          >
            <i className="fa fa-plus-circle fa-xs"></i>
          </div>
        )}
      </div>
    );
  };

  render() {
    const { pokemon, index } = this.props;
    const { overlayVisible } = this.state;
    const { getOverLayDiv } = this;
    const isTouchDevice = this.isTouchDevice();

    return (
      <div
        key={index}
        ref={this.imageContainerRef}
        onClick={this.imageClicked(isTouchDevice)}
        className={"pokemon-card-list-view"}
      >
        <div className="pokemon-name-and-image">
          <div className="pokemon-card-name-text">{pokemon.name}</div>
          <div className="pokemon-list-card-image-wrapper">
            <img
              src={pokemon.imageSource}
              alt="pokemonImage"
            />
          </div>
        </div>
        {isTouchDevice
          ? overlayVisible && getOverLayDiv(pokemon, isTouchDevice)
          : getOverLayDiv(pokemon, isTouchDevice)}
      </div>
    );
  }
}
