import React from "react";
import { Link } from "react-router-dom";
import "./mycollection.css";

export default class CollectionItem extends React.Component {
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
    const { removeFromCollection } = this.props;

    return (
      <div className={isTouchDevice ? "overlay-touch" : "overlay"}>
          <div
            onClick={() => removeFromCollection(pokemon)}
            className="icon remove-collection-icon"
            title="Add Collection"
          >
            <i className="fa fa-minus-circle fa-xs"></i>
          </div>
      </div>
    );
  };

  render() {
    const { pokemon, index } = this.props;
    const { overlayVisible } = this.state;
    const { getOverLayDiv, imageClicked } = this;
    const isTouchDevice = this.isTouchDevice();

    return ( <div key={index} className={"collection-pokemon-card-list-view"} ref={this.imageContainerRef} onClick={imageClicked(isTouchDevice)}>
        <div className="collection-pokemon-name-and-image">
          <div className="collection-pokemon-card-name-text">
            {pokemon.name}
          </div>
          <div className="collection-pokemon-list-card-image-wrapper">
            <img
              src={pokemon.imageSource}
              alt="pokemonImage"
              width={400}
              height={400}
            />
          </div>
        </div>
        {isTouchDevice ? (overlayVisible && getOverLayDiv(pokemon, isTouchDevice)) : getOverLayDiv(pokemon, isTouchDevice) }
      </div>
    );
  }
}
