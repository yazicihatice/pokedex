import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokeCardList from "../src/components/PokeCardList/PokeCardList";
import MyCollection from "./components/MyCollection/MyCollection";
import PokeDetail from "./components/PokeDetail/PokeDetail";

export default function App() {
  //TODO: configden al burdaki datayı
  return (
    <Router>
      <div>
        <nav>
          <ul className="home-page-list-wrapper">
            <li className="home-page-list-item">
              <Link to="/">Home</Link>
            </li>
            <li className="home-page-list-item">
              <Link to="/myCollection">My Collection</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/detail" component={PokeDetail} />
          <Route path="/myCollection" component={MyCollection}></Route>
          <Route path="/" component={PokeCardList} />
        </Switch>
      </div>
    </Router>
  );
}
