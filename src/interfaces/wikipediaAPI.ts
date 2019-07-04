export interface WikiState {
  searchQuery: string;
  inputFocus: boolean;
  searchResults: SearchResult[];
  pageNum: number;
  closeNav: boolean;
}

export interface SearchResult {
  pageid: number;
  title: string;
  extract: string;
  link: string;
}
