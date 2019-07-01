import * as React from "react";
import { Container, Input } from "reactstrap";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NavBar from "../NavBar";
import Article from "./Article";
import { WikiState, SearchResult } from "../../interfaces/wikipediaAPI";

/**
 * TODO
 * [x] Change id references to refs
 * [ ] Add clickable navbar button to open NavBar component
 */

const initialState: WikiState = {
  searchQuery: "",
  inputFocus: false,
  searchResults: null,
};

class WikipediaAPI extends React.Component<object, WikiState> {
  public readonly state = initialState;

  private boxContainerRef = React.createRef<HTMLDivElement>();
  private searchInputRef = React.createRef<HTMLInputElement>();
  private searchBtnRef = React.createRef<HTMLImageElement>();
  private cancelBtnRef = React.createRef<HTMLElement>();

  public componentDidMount(): void {
    this.searchBtnRef.current.addEventListener("click", this.onSearchClick);
    this.cancelBtnRef.current.addEventListener("click", this.onCancelClick);
    this.searchInputRef.current.addEventListener("keydown", this.onEnterPress);
  }

  private onSearchClick = (): void => {
    const searchBtn = this.searchBtnRef.current;
    const cancelBtn = this.cancelBtnRef.current;
    const input = this.searchInputRef.current;

    searchBtn.className = "wiki__searchBtn animated fadeOut";
    setTimeout((): void => {
      input.className = "wiki__searchInput animated zoomIn";
      searchBtn.classList.add("hidden");
    }, 400);
    setTimeout((): void => {
      cancelBtn.className =
        "wiki__searchClear fa fa-times-circle animated fadeIn delay-1s";
    }, 1000);
  };

  private onCancelClick = (): void => {
    const searchBtn = this.searchBtnRef.current;
    const cancelBtn = this.cancelBtnRef.current;
    const input = this.searchInputRef.current;
    cancelBtn.classList.remove("fadeIn");
    cancelBtn.classList.add("fadeOut");

    setTimeout((): void => {
      input.classList.remove("zoomIn");
      input.classList.add("zoomOut");
    }, 500);

    setTimeout((): void => {
      searchBtn.className = "wiki__searchBtn animated fadeIn";
    }, 800);
  };

  private onEnterPress = (e: KeyboardEvent): void => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const box = this.boxContainerRef.current;
    this.setState({ searchQuery: e.target.value });
  };

  private handleSearch = async (): Promise<void> => {
    const { searchQuery } = this.state;
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchQuery}&srlimit=10&origin=*`,
        {
          method: "GET",
        },
      );
      const { query } = await res.json();
      if (query.searchinfo.totalhits === 0) {
        return this.setState({ searchResults: null, searchQuery: "" });
      }
      console.log(query);
      const box = this.boxContainerRef.current;
      box.className = "wiki__containerAnimation";
      const searchResults = this.formatSearchResults(query.search, searchQuery);
      setTimeout((): void => {
        return this.setState({ searchQuery: "", searchResults });
      }, 500);
    } catch (err) {
      throw new Error(`Something went wrong!: \n
        ${err}`);
    }
  };

  private formatSearchResults = (
    results: SearchResult[],
    query: string,
  ): SearchResult[] => {
    const searchResults: SearchResult[] = [];
    results.forEach(
      (result): void => {
        console.log(result);
        const { title, snippet, pageid } = result;
        searchResults.push({
          pageid,
          title,
          snippet,
          link: `https://en.wikipedia.org/wiki/${query.replace(" ", "%20")}`,
        });
      },
    );
    return searchResults;
  };

  public render(): JSX.Element {
    const { searchQuery, searchResults } = this.state;
    return (
      <div className="wiki__container">
        <NavBar {...this.state} />
        <Container>
          <div className="wiki__boxContainer" ref={this.boxContainerRef}>
            <p className="wiki__randomLinkText">
              <a href="https://en.wikipedia.org/wiki/Special:Random">
                Click <b>here</b> for a random article
              </a>
            </p>
            <div className="wiki__searchContainer">
              <input
                className="wiki__searchInput hidden"
                ref={this.searchInputRef}
                type="search"
                value={searchQuery}
                placeholder="Search..."
                onChange={this.onSearchChange}
              />
              <img
                alt="Search Button"
                ref={this.searchBtnRef}
                className="wiki__searchBtn"
                src="https://www.thesecu.com/wp-content/themes/secu/assets/images/Apps-Search-icon.png"
              />
              <i
                className="wiki__searchClear fa fa-times-circle hidden"
                ref={this.cancelBtnRef}
              />
            </div>
            <p className="wiki__searchText">
              Or click the search button to search for a particular article.
              <br />
              Press &apos;Enter&apos; to begin search.
            </p>
          </div>
          {searchResults !== null && (
            <div className="wiki__searchResultsContainer">
              {searchResults.map(
                (result): JSX.Element => (
                  <Article key={result.pageid} {...result} />
                ),
              )}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default WikipediaAPI;
