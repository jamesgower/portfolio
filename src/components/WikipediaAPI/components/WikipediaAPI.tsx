import * as React from "react";
import { Container, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import HiddenNavBar from "../../NavBar/components/HiddenNavBar";
import Article from "./Article";
import WikiState from "../interfaces/wikipediaAPI.i";
import ArticleProps from "../interfaces/article.i";

/**
 * TODO
 * [x] Change id references to refs
 * [ ] Add clickable navbar button to open NavBar component
 * [ ] Add pagination for first 5 pages of results (10 per page)
 */

class WikipediaAPI extends React.Component<object, WikiState> {
  private initialState = {
    searchQuery: "",
    inputFocus: false,
    searchResults: null,
    pageNum: 1,
    closeNav: false,
  };

  private pageRanges: object = {
    1: [0, 10],
    2: [10, 20],
    3: [20, 30],
    4: [30, 40],
    5: [40, 50],
  };

  public readonly state = this.initialState;

  private boxContainerRef = React.createRef<HTMLDivElement>();
  private searchInputRef = React.createRef<HTMLInputElement>();
  private searchBtnRef = React.createRef<HTMLImageElement>();
  private cancelBtnRef = React.createRef<HTMLElement>();

  public componentDidMount(): void {
    this.searchBtnRef.current.addEventListener("click", this.onSearchClick);
    this.cancelBtnRef.current.addEventListener("click", this.onCancelClick);
    this.searchInputRef.current.addEventListener("keydown", this.onEnterPress);
  }

  public componentWillUnmount(): void {
    this.searchBtnRef.current.removeEventListener("click", this.onSearchClick);
    this.cancelBtnRef.current.removeEventListener("click", this.onCancelClick);
    this.searchInputRef.current.removeEventListener("keydown", this.onEnterPress);
  }

  private onSearchClick = (): void => {
    const searchBtn = this.searchBtnRef.current;
    const cancelBtn = this.cancelBtnRef.current;
    const input = this.searchInputRef.current;

    searchBtn.className = "wiki__search-btn animated fadeOut";
    setTimeout((): void => {
      input.className = "wiki__search-input animated zoomIn";
      searchBtn.classList.add("hidden");
    }, 400);
    setTimeout((): void => {
      cancelBtn.className =
        "wiki__search-clear-btn fa fa-times-circle animated fadeIn delay-1s";
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
      searchBtn.className = "wiki__search-btn animated fadeIn";
    }, 800);
  };

  private onEnterPress = (e: KeyboardEvent): void => {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  };

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: e.target.value });
  };

  private handleSearch = async (): Promise<void> => {
    const { searchQuery } = this.state;
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&list=search&utf8=1&srsearch=${searchQuery}&srlimit=50&origin=*`,
        {
          method: "GET",
        },
      );
      const { query } = await res.json();
      const searchFormatted = searchQuery.replace(" ", "%20");
      if (query.searchinfo.totalhits === 0) {
        this.setState({ searchResults: null, searchQuery: "" });
      }
      const box = this.boxContainerRef.current;
      box.className = "wiki__container-animation";
      const searchResults: ArticleProps[] = [];
      query.search.forEach(
        async (result): Promise<void> => {
          const { pageid } = result;
          const res = await fetch(
            `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=4&pageids=
          ${pageid}&origin=*`,
            {
              method: "GET",
            },
          );
          const { query } = await res.json();
          searchResults.push({
            pageid,
            title: query.pages[pageid].title,
            extract: query.pages[pageid].extract,
            link: `https://en.wikipedia.org/wiki/${searchFormatted}`,
          });
        },
      );
      setTimeout((): void => {
        this.setState({ searchQuery: "", searchResults });
      }, 500);
    } catch (err) {
      throw new Error(`Something went wrong!: \n
        ${err}`);
    }
  };

  public render(): JSX.Element {
    const { searchQuery, searchResults, pageNum } = this.state;
    return (
      <div className="wiki__container">
        <div className="wiki__nav-container">
          <HiddenNavBar />
        </div>
        <Container>
          <div className="wiki__box-container" ref={this.boxContainerRef}>
            <p className="wiki__text">
              <a href="https://en.wikipedia.org/wiki/Special:Random">
                Click <b>here</b> for a random article
              </a>
            </p>
            <div className="wiki__search-container">
              <input
                className="wiki__search-input hidden"
                ref={this.searchInputRef}
                type="search"
                value={searchQuery}
                placeholder="Search..."
                onChange={this.onSearchChange}
              />
              <img
                alt="Search Button"
                ref={this.searchBtnRef}
                className="wiki__search-btn"
                src="https://www.thesecu.com/wp-content/themes/secu/assets/images/Apps-Search-icon.png"
              />
              <i
                className="wiki__search-clear-btn fa fa-times-circle hidden"
                ref={this.cancelBtnRef}
              />
            </div>
            <p className="wiki__text">
              Or click the search button to search for a particular article.
              <br />
              Press &apos;Enter&apos; to begin search.
            </p>
          </div>
          {searchResults !== null && (
            <div className="wiki__search-results-container">
              {searchResults
                .slice(this.pageRanges[pageNum][0], this.pageRanges[pageNum][1])
                .map(
                  (result: ArticleProps): JSX.Element => (
                    <Article key={result.pageid} {...result} />
                  ),
                )}
              <div className="wiki__pagination-container">
                <Pagination size="lg" aria-label="Article Page Navigation">
                  <PaginationItem>
                    <PaginationLink
                      first
                      onClick={(): void => this.setState({ pageNum: 1 })}
                    />
                  </PaginationItem>
                  <PaginationItem disabled={pageNum <= 1}>
                    <PaginationLink
                      previous
                      onClick={(): void => {
                        const newPage: number = pageNum - 1;
                        this.setState({ pageNum: newPage });
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem active={pageNum === 1}>
                    <PaginationLink onClick={(): void => this.setState({ pageNum: 1 })}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active={pageNum === 2}>
                    <PaginationLink onClick={(): void => this.setState({ pageNum: 2 })}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active={pageNum === 3}>
                    <PaginationLink onClick={(): void => this.setState({ pageNum: 3 })}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active={pageNum === 4}>
                    <PaginationLink onClick={(): void => this.setState({ pageNum: 4 })}>
                      4
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem active={pageNum === 5}>
                    <PaginationLink onClick={(): void => this.setState({ pageNum: 5 })}>
                      5
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem disabled={pageNum >= 5}>
                    <PaginationLink
                      next
                      onClick={(): void => {
                        const newPage = pageNum + 1;
                        this.setState({ pageNum: newPage });
                      }}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      last
                      onClick={(): void => this.setState({ pageNum: 5 })}
                    />
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default WikipediaAPI;
