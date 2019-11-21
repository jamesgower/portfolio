import React, { Component } from "react";
import axios from "axios";
import {
  Input,
  Container,
  Row,
  Col,
  Label,
  Button,
  Spinner,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { connect } from "react-redux";
import Card from "../containers/Card";
import NavBar from "../navbar/NavBar";
import * as actions from "../../actions/auth.actions";
import TopMedia from "../home/TopMedia";
import { ProfileState, AuthState } from "../../interfaces/app.i";
import { Pages } from "../common/Pages";

interface Props {
  fetchUser: () => void;
  profile: ProfileState;
}
interface State {
  sortBy: string;
  fromYear: string;
  toYear: string;
  minRating: string;
  prefGenre: string;
  avoidGenre: string;
  results: any;
  error: string;
  maxPages: number;
  page: number;
  search: boolean;
  discover: boolean;
  query: string;
}

class TVShows extends Component<Props, State> {
  public data;
  public constructor(props) {
    super(props);
    const { fetchUser } = this.props;
    fetchUser();
    this.state = {
      prefGenre: "",
      avoidGenre: "",
      fromYear: "1900",
      toYear: "2020",
      sortBy: "popularity.desc",
      minRating: "5",
      results: null,
      error: null,
      maxPages: null,
      page: 1,
      search: false,
      discover: false,
      query: "",
    };
  }

  public onSearch = async (page = 1): Promise<void> => {
    const { discover, query } = this.state;
    if (!discover && !query) {
      return this.setState({ error: "Please enter a valid search" });
    }
    this.setState({ results: null, search: true });
    let res;
    if (discover) {
      const { sortBy, fromYear, toYear, minRating, prefGenre, avoidGenre } = this.state;
      if (prefGenre === avoidGenre && prefGenre && avoidGenre)
        return this.setState({ error: "You cannot prefer and avoid the same genre" });
      const query = `${prefGenre && `&with_genres=${prefGenre}`}${avoidGenre &&
        `&without_genres=${avoidGenre}`}&page=${page}&vote_average.gte=${minRating}&sort_by=${sortBy}&first_air_date.gte=${fromYear}-01-01&first_air_date.lte=${toYear}-01-01`;
      res = await axios.get(
        `${process.env.TMDB_URL}/discover/tv${process.env.TMDB_API_KEY}${query}`,
      );
    } else {
      res = await axios.get(
        `${process.env.TMDB_URL}/search/tv${process.env.TMDB_API_KEY}&query=${query}&page=${page}`,
      );
    }
    return this.setState({
      results: res.data.results,
      maxPages: res.data.total_pages,
    });
  };

  public render(): JSX.Element {
    const {
      fromYear,
      toYear,
      sortBy,
      minRating,
      results,
      prefGenre,
      avoidGenre,
      error,
      page,
      maxPages,
      search,
      discover,
      query,
    } = this.state;
    const { profile } = this.props;
    return (
      profile && (
        <div className="tv__container">
          <NavBar />
          <Container>
            <p className="home__text">
              Click the &apos;Search&apos; tab to search by name, or discover new TV shows
              in the &apos;Discover&apos; tab.
            </p>
            <div className="movies__search-options">
              <p
                onClick={(): void => this.setState({ discover: false })}
                className={`movies__search${!discover ? "--active" : ""}`}
              >
                Search by name
              </p>
              <p
                onClick={(): void => this.setState({ discover: true })}
                className={`movies__search${discover ? "--active" : ""}`}
              >
                Discover
              </p>
            </div>
            {discover ? (
              <div className="movies__search-container">
                <Row style={{ marginBottom: "10px" }}>
                  <Col md={5}>
                    <Label className="movies__label">
                      Preferred Genre Type:
                      <span className="movies__optional">(optional)</span>
                    </Label>
                    <Input
                      type="select"
                      value={prefGenre}
                      className="movies__form-input"
                      onChange={(e): void => this.setState({ prefGenre: e.target.value })}
                    >
                      <option value="" />
                      <option value="10759">Action & Adventure</option>
                      <option value="16">Animation</option>
                      <option value="35">Comedy</option>
                      <option value="80">Crime</option>
                      <option value="99">Documentary</option>
                      <option value="18">Drama</option>
                      <option value="10751">Family</option>
                      <option value="10762">Kids</option>
                      <option value="9648">Mystery</option>
                      <option value="10763">News</option>
                      <option value="10764">Reality</option>
                      <option value="10765">Sci-Fi & Fantasy</option>
                      <option value="10766">Soaps</option>
                      <option value="10767">Talk</option>
                      <option value="10768">War & Politics</option>
                      <option value="37">Western</option>
                    </Input>
                  </Col>
                  <Col md={5}>
                    <Label className="movies__label">
                      Avoid Genre Type:
                      <span className="movies__optional">(optional)</span>
                    </Label>
                    <Input
                      type="select"
                      value={avoidGenre}
                      className="movies__form-input"
                      onChange={(e): void =>
                        this.setState({ avoidGenre: e.target.value })
                      }
                    >
                      <option value="" />
                      <option value="10759">Action & Adventure</option>
                      <option value="16">Animation</option>
                      <option value="35">Comedy</option>
                      <option value="80">Crime</option>
                      <option value="99">Documentary</option>
                      <option value="18">Drama</option>
                      <option value="10751">Family</option>
                      <option value="10762">Kids</option>
                      <option value="9648">Mystery</option>
                      <option value="10763">News</option>
                      <option value="10764">Reality</option>
                      <option value="10765">Sci-Fi & Fantasy</option>
                      <option value="10766">Soaps</option>
                      <option value="10767">Talk</option>
                      <option value="10768">War & Politics</option>
                      <option value="37">Western</option>
                    </Input>
                  </Col>
                  <Col md={2}>
                    <Label className="movies__label">Min Rating:</Label>
                    <Input
                      type="number"
                      onChange={(e): void => this.setState({ minRating: e.target.value })}
                      value={minRating}
                      className="movies__form-input"
                      min={1}
                      max={10}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Label className="movies__label">Starting Year:</Label>
                    <Input
                      type="number"
                      value={fromYear}
                      className="movies__form-input"
                      onChange={(e): void => this.setState({ fromYear: e.target.value })}
                      min={1900}
                      max={toYear}
                    />
                  </Col>
                  <Col md={4}>
                    <Label className="movies__label">Ending Year:</Label>
                    <Input
                      type="number"
                      className="movies__form-input"
                      onChange={(e): void => this.setState({ toYear: e.target.value })}
                      value={toYear}
                      min={fromYear}
                      max={2020}
                    />
                  </Col>
                  <Col md={4}>
                    <Label className="movies__label">Sort by:</Label>
                    <Input
                      type="select"
                      value={sortBy}
                      className="movies__form-input"
                      onChange={(e): void => this.setState({ sortBy: e.target.value })}
                    >
                      <option value="popularity.desc">Popularity</option>
                      <option value="vote_average.desc">Rating</option>
                      <option value="first_air_date.desc">Newest Releases</option>
                      <option value="first_air_date.asc">Oldest Releases</option>
                    </Input>
                  </Col>
                  <Button
                    outline
                    color="success"
                    onClick={(): Promise<void> => this.onSearch()}
                    style={{
                      margin: "20px auto 0",
                      fontSize: "16px",
                      fontFamily: "Barlow Semi Condensed, sans-serif",
                    }}
                  >
                    Search
                  </Button>
                  {error && <p className="movies__error">{error}</p>}
                </Row>
              </div>
            ) : (
              <div className="movies__search-container">
                <InputGroup>
                  <Input
                    type="text"
                    value={query}
                    invalid={!!error}
                    onKeyDown={(e): void => {
                      if (e.keyCode === 13) {
                        this.onSearch();
                      }
                    }}
                    placeholder="Enter TV show name to begin the search..."
                    className="movies__form-input"
                    onChange={(e): void => this.setState({ query: e.target.value })}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      color="success"
                      size="lg"
                      onClick={(): Promise<void> => this.onSearch()}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {error && <p className="movies__error">{error}</p>}
              </div>
            )}
            <Row>
              {results &&
                results.map(
                  (movie): JSX.Element => (
                    <Col
                      key={movie.id}
                      sm={3}
                      style={{ height: "340px", marginBottom: "30px" }}
                    >
                      <Card
                        posterLink={movie.poster_path}
                        title={movie.name}
                        id={movie.id}
                        type="tv"
                      />
                    </Col>
                  ),
                )}
              {search && !results && (
                <Spinner
                  color="primary"
                  style={{ margin: "25vh auto", width: "4rem", height: "4rem" }}
                />
              )}
              {!search && (
                <Container style={{ margin: "80px 0 0" }}>
                  <h1 className="movies__title">Popular TV Shows</h1>
                  <TopMedia type="tv" autoplay={2000} />
                </Container>
              )}
              {results && (
                <div className="movies__pagination-container">
                  <Pages
                    page={page}
                    maxPages={maxPages}
                    setPage={(page): void => this.setState({ page })}
                    search={(page): Promise<void> => this.onSearch(page)}
                  />
                </div>
              )}
            </Row>
          </Container>
        </div>
      )
    );
  }
}

const mapStateToProps = ({
  letsWatch: {
    auth: { profile },
  },
}): AuthState => ({ profile });

export default connect(mapStateToProps, actions)(TVShows);
