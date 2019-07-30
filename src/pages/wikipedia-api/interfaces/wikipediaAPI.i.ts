import { ArticleProps } from "./article.i";

export interface WikiState {
  searchQuery: string;
  inputFocus: boolean;
  searchResults: ArticleProps[];
  pageNum: number;
  closeNav: boolean;
  noArticleFound: boolean;
  desktop: boolean;
}
