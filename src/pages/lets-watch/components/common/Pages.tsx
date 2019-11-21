import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  page: number;
  maxPages: number;
  setPage: (num) => void;
  search: (num) => void;
}

export const Pages: React.FC<Props> = ({
  page,
  maxPages,
  setPage,
  search,
}): JSX.Element => {
  return (
    <Pagination
      aria-label="Choose page"
      size="lg"
      style={{ position: "relative", bottom: "10px" }}
    >
      <PaginationItem
        disabled={page === 1}
        className="movies__pagination"
        onClick={(): void => {
          setPage(1);
          search(1);
        }}
      >
        <PaginationLink first />
      </PaginationItem>
      <PaginationItem
        disabled={page === 1}
        className="movies__pagination"
        onClick={(): void => {
          setPage(page - 1);
          search(page - 1);
        }}
      >
        <PaginationLink previous />
      </PaginationItem>
      <PaginationItem
        className="movies__pagination"
        active={page === 1 || page === maxPages - 4}
        onClick={(): void => {
          const newPage = page >= 5 ? (page > maxPages - 5 ? maxPages - 4 : page - 2) : 1;
          setPage(newPage);
          search(newPage);
        }}
      >
        <PaginationLink>
          {page >= 5 ? (page > maxPages - 5 ? maxPages - 4 : page - 2) : 1}
        </PaginationLink>
      </PaginationItem>
      {maxPages > 1 && (
        <PaginationItem
          className="movies__pagination"
          active={page === 2 || page === maxPages - 3}
          onClick={(): void => {
            const newPage =
              page >= 5 ? (page > maxPages - 5 ? maxPages - 3 : page - 1) : 2;
            setPage(newPage);
            search(newPage);
          }}
        >
          <PaginationLink>
            {page >= 5 ? (page > maxPages - 5 ? maxPages - 3 : page - 1) : 2}
          </PaginationLink>
        </PaginationItem>
      )}
      {maxPages > 2 && (
        <PaginationItem
          className="movies__pagination"
          active={
            page === 3 || page === maxPages - 2 || (page >= 5 && page < maxPages - 5)
          }
          onClick={(): void => {
            const newPage = page >= 5 ? (page > maxPages - 5 ? maxPages - 2 : page) : 3;
            setPage(newPage);
            search(newPage);
          }}
        >
          <PaginationLink>
            {page >= 5 ? (page > maxPages - 5 ? maxPages - 2 : page) : 3}
          </PaginationLink>
        </PaginationItem>
      )}
      {maxPages > 3 && (
        <PaginationItem
          className="movies__pagination"
          active={page === 4 || page === maxPages - 1}
          onClick={(): void => {
            const newPage =
              page >= 5 ? (page > maxPages - 5 ? maxPages - 1 : page + 1) : 4;
            setPage(newPage);
            search(newPage);
          }}
        >
          <PaginationLink>
            {page >= 5 ? (page > maxPages - 5 ? maxPages - 1 : page + 1) : 4}
          </PaginationLink>
        </PaginationItem>
      )}
      {maxPages > 4 && (
        <PaginationItem
          className="movies__pagination"
          active={page === maxPages}
          onClick={(): void => {
            const newPage = page >= 5 ? (maxPages - 5 ? maxPages : page + 2) : 5;
            setPage(newPage);
            search(newPage);
          }}
        >
          <PaginationLink>
            {page >= 5 ? (page > maxPages - 5 ? maxPages : page + 2) : 5}
          </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem
        className="movies__pagination"
        onClick={(): void => {
          setPage(page + 1);
          search(page + 1);
        }}
      >
        <PaginationLink next />
      </PaginationItem>
      <PaginationItem
        className="movies__pagination"
        disabled={page === maxPages}
        onClick={(): void => {
          setPage(maxPages);
          search(maxPages);
        }}
      >
        <PaginationLink last />
      </PaginationItem>
    </Pagination>
  );
};
