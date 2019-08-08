import React from "react";
import { Container } from "reactstrap";
import HiddenNavBar from "../../nav-bar/components/HiddenNavBar";
import Article from "./Article";
import { WikiState } from "../interfaces/wikipediaAPI.i";
import { ArticleProps } from "../interfaces/article.i";
import background from "../images/background.png";
import PageControl from "./PageControl";

class WikipediaAPI extends React.Component<object, WikiState> {
  private initialState = {
    searchQuery: "",
    inputFocus: false,
    searchResults: null,
    pageNum: 1,
    closeNav: false,
    noArticleFound: false,
    desktop: window.innerWidth > 740,
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
  private wikiRandomRef = React.createRef<HTMLDivElement>();
  private wikiTextRef = React.createRef<HTMLDivElement>();
  private searchContainerRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    this.searchBtnRef.current.addEventListener("click", this.onSearchClick);
    this.cancelBtnRef.current.addEventListener("click", this.onCancelClick);
    this.searchInputRef.current.addEventListener("keydown", this.onEnterPress);
    window.addEventListener("resize", this.handleWindowDimension);
  }

  public componentWillUnmount(): void {
    this.searchBtnRef.current.removeEventListener("click", this.onSearchClick);
    this.cancelBtnRef.current.removeEventListener("click", this.onCancelClick);
    this.searchInputRef.current.removeEventListener("keydown", this.onEnterPress);
    window.addEventListener("resize", this.handleWindowDimension);
  }

  private handleWindowDimension = (): void => {
    if (window.innerWidth > 740) {
      this.setState({ desktop: true });
    }
  };

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
      cancelBtn.className = "wiki__search-clear-btn fa fa-times-circle animated fadeIn";
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
    const { desktop } = this.state;
    if (e.keyCode === 13) {
      if (!desktop) {
        this.wikiRandomRef.current.classList.add("animated", "fadeOut");
        this.wikiTextRef.current.classList.add("animated", "fadeOut");
      }
      setTimeout((): void => {
        this.handleSearch();
      }, 500);
    }
  };

  private onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: e.target.value });
  };

  private handleSearch = async (): Promise<void> => {
    const { searchQuery, noArticleFound, desktop } = this.state;
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
        this.setState({
          searchResults: null,
          searchQuery: "",
          noArticleFound: true,
        });
      }
      const box = this.boxContainerRef.current;
      if (desktop) {
        box.className = "wiki__container-animation";
      } else {
        box.className = "wiki__container-animation--small";
        this.searchContainerRef.current.style.marginTop = "40px";
      }

      this.onCancelClick();
      if (noArticleFound) return;
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
        this.setState({ searchQuery: "", searchResults, noArticleFound: false });
      }, 500);
    } catch (err) {
      throw new Error(`Something went wrong!: \n
        ${err}`);
    }
  };

  public render(): JSX.Element {
    const { searchQuery, searchResults, pageNum, noArticleFound } = this.state;
    return (
      <div
        className="wiki__container"
        style={{ background: `url(${background}) no-repeat center center fixed` }}
      >
        <div className="wiki__nav-container">
          <HiddenNavBar color="white" navBackground={background} />
        </div>
        <Container>
          <div className="wiki__box-container" ref={this.boxContainerRef}>
            <div className="wiki__text" ref={this.wikiRandomRef}>
              <a
                href="https://en.wikipedia.org/wiki/Special:Random"
                rel="noopener noreferrer"
                target="_blank"
              >
                Click <b>here</b> for a random article
              </a>
            </div>
            <div className="wiki__search-container" ref={this.searchContainerRef}>
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
            <div className="wiki__text" ref={this.wikiTextRef}>
              Or click the search button to search for a particular article.
              <br />
              Press &apos;Enter&apos; to begin search.
            </div>
          </div>

          {noArticleFound && (
            <Article
              pageid={0}
              title="No Results"
              extract="No search results found, Please search for another article."
            />
          )}
          {searchResults !== null && (
            <div className="wiki__search-results-container">
              {searchResults
                .slice(this.pageRanges[pageNum][0], this.pageRanges[pageNum][1])
                .map(
                  (result: ArticleProps): JSX.Element => (
                    <Article key={result.pageid} {...result} />
                  ),
                )}
              <PageControl
                pageNum={pageNum}
                setPageNum={(pageNum: number): void => this.setState({ pageNum })}
              />
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default WikipediaAPI;
