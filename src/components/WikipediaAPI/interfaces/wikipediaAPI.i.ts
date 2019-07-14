import ArticleProps from "./article.i";

interface WikiState {
  searchQuery: string;
  inputFocus: boolean;
  searchResults: ArticleProps[];
  pageNum: number;
  closeNav: boolean;
}

export { WikiState as default };
