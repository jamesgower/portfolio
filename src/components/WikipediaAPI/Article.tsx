import * as React from "react";
import { SearchResult } from "../../interfaces/wikipediaAPI";

export default class Article extends React.Component<SearchResult, {}> {
  private snippetRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const { snippet } = this.props;
    this.snippetRef.current.innerHTML = snippet;
  }

  public render(): JSX.Element {
    const { pageid, title, link } = this.props;
    return (
      <div
        key={pageid}
        className="article__container animated fadeInLeft"
        onClick={() => window.open(link, "_blank")}
      >
        <h1 className="article__title">{title}</h1>
        <div className="article__snippet" ref={this.snippetRef} />
      </div>
    );
  }
}
