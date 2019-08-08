import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import Modal from "react-modal";
import Calculator from "../../calculator/components/Calculator";
import GridState from "../interfaces/grid.i";
import tilesData from "../data/tiles.data";

/*
  TODO
  [ ] Readme.md for all GitHub projects with relevant installation & usage info
  [ ] Look at touch events ?? TEST CURRENT FIRST
*/

export class Grid extends React.Component<{}, GridState> {
  public readonly state: GridState = {
    redirect: false,
    isOpen: false,
  };

  public animations: number;

  private customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px 40px",
    },
  };

  public componentDidMount = (): void => {
    this.animations = window.setInterval((): void => {
      this.randomAnimation();
    }, 8000);
    document.getElementById("grid").classList.add("animated", "fadeIn");
  };

  public componentWillUnmount = (): void => {
    clearInterval(this.animations);
  };

  // Random animation for each element in the grid
  private randomAnimation = (): void => {
    const e = document.getElementById(
      `tile${Math.floor(Math.random() * tilesData.length)}`,
    );
    const previous = e.className;
    const animations = ["bounce", "pulse", "swing", "tada", "rubberBand"];
    // Random animation gets picked
    const random = ` animated ${
      animations[Math.floor(Math.random() * animations.length)]
    }`;
    e.className += random;
    setTimeout((): void => {
      e.className = previous;
    }, 1000);
  };

  private handleOnClick = (route: string): void => {
    this.setState({ route, redirect: true });
  };

  public render(): JSX.Element {
    const { redirect, route } = this.state;
    if (redirect) {
      return <Redirect push to={route} />;
    }
    const { isOpen } = this.state;
    return (
      <>
        <div className="projects__container" id="current-work">
          <h1 className="projects__title">PROJECTS</h1>
          <p className="projects__text">
            Here are a few examples of the projects that I have created during my Software
            Development journey. Most of the front-end of these projects are normally
            built using <b>React</b> with <b>TypeScript</b> and occasionally{" "}
            <b>JavaScript</b>, whilst the back-end is normally built using <b>Node.JS</b>,
            alongside a database such as <b>MongoDB</b> or <b>FireBase</b>.
          </p>
          <p className="projects__text">
            Hover over each of the tiles to see which technologies were used for the
            project, and optionally click the &quot;View Source&quot; button to view the
            source code on GitHub. Click on the tile to open the project - larger projects
            are hosted on Heroku&apos;s free plan, so may take a few moments to load.
          </p>
        </div>
        <Modal
          isOpen={isOpen}
          onRequestClose={(): void => this.setState({ isOpen: false })}
          style={this.customStyles}
          contentLabel="Calculator"
        >
          <Calculator />
        </Modal>
        <div id="grid" className="projects__grid-container">
          <div className="row">
            {tilesData.map(
              (tile, i): JSX.Element => {
                return (
                  <div
                    className={
                      tile.featured
                        ? "projects__tile col-md-7 col-6"
                        : "projects__tile col-md-5 col-6"
                    }
                    key={i}
                  >
                    <div
                      id={`tile${i}`}
                      style={{
                        background: tile.color,
                      }}
                      role="button"
                      tabIndex={0}
                      className="projects__grid-border"
                      onClick={
                        tile.click
                          ? (): void => this.setState({ isOpen: true })
                          : tile.redirect
                          ? (): void => {
                              location.href = tile.href;
                            }
                          : (): void => this.handleOnClick(tile.href)
                      }
                    >
                      <img src={tile.img} alt={tile.title} className="animated" />
                      <i
                        className={`${tile.class}`}
                        style={{
                          color: tile.color,
                        }}
                      />
                      <p className="projects__tile--title">{tile.title}</p>
                      <p className="projects__tile--subtitle">{tile.subtitle}</p>
                      <Button
                        className="projects__source-button"
                        outline
                        color="light"
                        onClick={(e): void => {
                          e.stopPropagation();
                          document.location.href = tile.sourceCode;
                        }}
                      >
                        View Source
                      </Button>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Grid;
