import * as React from "react";
import { Container, Input } from "reactstrap";
import NavBar from "./NavBar";
import { WikiState } from "../interfaces/wikipediaAPI";

const initialState: WikiState = {
  searchQuery: "",
  inputFocus: false,
};

class WikipediaAPI extends React.Component {
  public readonly state = initialState;
  public render(): JSX.Element {
    return (
      <div className="wiki__container">
        <NavBar {...this.state} />
        <Container>
          <div className="wiki__boxContainer">
            <p className="wiki__randomLinkText">
              <a href="https://en.wikipedia.org/wiki/Special:Random">
                Click <b>here</b> for a random article
              </a>
            </p>
            <div className="wiki__searchContainer">
              <input className="wiki__searchInput" type="search" placeholder="Search..." />
              <img
                alt="Search Button"
                className="wiki__searchBtn"
                src="https://www.thesecu.com/wp-content/themes/secu/assets/images/Apps-Search-icon.png"
              />
              <i className="fa fa-times-circle wiki__searchClear" />
            </div>
            <p className="wiki__searchText">
              Or click the search button to search for a particular article.
            </p>
          </div>
        </Container>
        <div id="searchResults" />
      </div>
    );
  }
}

export default WikipediaAPI;
