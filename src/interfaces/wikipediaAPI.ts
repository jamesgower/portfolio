export interface WikiState {
  searchQuery: string;
  inputFocus: boolean;
  searchResults: SearchResult[];
}

export interface SearchResult {
  pageid: number;
  title: string;
  snippet: string;
  link: string;
}
