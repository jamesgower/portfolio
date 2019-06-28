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

  public componentDidMount(): void {
    const button = document.getElementById("searchBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    button.addEventListener("click", this.onSearchClick);
    cancelBtn.addEventListener("click", this.onCancelClick);
  }

  public onSearchClick = (): void => {
    const button = document.getElementById("searchBtn");
    const input = document.getElementById("searchInput");
    const cancelBtn = document.getElementById("cancelBtn");

    button.classList.add("animated", "fadeOut");
    input.classList.remove("hidden");
    input.classList.add("animated", "zoomIn");
    setTimeout(() => {
      cancelBtn.classList.remove("hidden");
      cancelBtn.classList.add("animated", "fadeIn");
    }, 800);
  };

  public onCancelClick = (): void => {
    const button = document.getElementById("searchBtn");
    const input = document.getElementById("searchInput");
    const cancelBtn = document.getElementById("cancelBtn");
    cancelBtn.classList.remove("fadeIn");
    cancelBtn.classList.add("fadeOut");

    setTimeout(() => {
      input.classList.remove("zoomIn");
      input.classList.add("zoomOut");
    }, 500);

    setTimeout(() => {
      button.classList.remove("fadeOut");
      button.classList.add("fadeIn");
    }, 800);
  };

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
              <input
                className="wiki__searchInput hidden"
                id="searchInput"
                type="search"
                placeholder="Search..."
              />
              <img
                alt="Search Button"
                id="searchBtn"
                className="wiki__searchBtn"
                src="https://www.thesecu.com/wp-content/themes/secu/assets/images/Apps-Search-icon.png"
              />
              <i
                className="wiki__searchClear fa fa-times-circle wiki__searchClear hidden"
                id="cancelBtn"
              />
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
