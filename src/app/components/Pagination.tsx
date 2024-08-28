/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const paginationContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const paginationLinkStyles = css`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  display: inline-block;
  margin: 0 0.25rem;
  border: 2px solid transparent; /* Default border to handle focus and hover */
  color: #0070f3; /* Blue text color */
  background-color: #f1f1f1; /* Light background */

  &:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
  }

  &:focus {
    outline: none;
    border-color: #0070f3; /* Blue border on focus */
    background-color: #fff; /* White background on focus */
  }

  &.current {
    background-color: #0070f3; /* Blue background for current page */
    color: white;
    border-color: #0070f3; /* Ensure border matches background for current page */
  }
`;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const createPaginationLinks = () => {
    const links = [];
    const maxPagesToShow = 3;
    const isStart = currentPage <= maxPagesToShow;
    const isEnd = currentPage > totalPages - maxPagesToShow;

    if (currentPage > 1) {
      links.push(
        <li key="prev">
          <a css={paginationLinkStyles} onClick={() => onPageChange(currentPage - 1)}>&laquo; Précédent</a>
        </li>
      );
    }

    if (!isStart) {
      links.push(
        <li key="1">
          <a css={paginationLinkStyles} onClick={() => onPageChange(1)}>1</a>
        </li>
      );
      if (currentPage > maxPagesToShow + 1) {
        links.push(
          <li key="start-ellipsis">
            <span css={paginationLinkStyles}>...</span>
          </li>
        );
      }
    }

    const startPage = isStart ? 1 : currentPage - 1;
    const endPage = isEnd ? totalPages : currentPage + 1;

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <li key={i}>
          {i === currentPage ? (
            <span css={paginationLinkStyles} className="current">{i}</span>
          ) : (
            <a css={paginationLinkStyles} onClick={() => onPageChange(i)}>{i}</a>
          )}
        </li>
      );
    }

    if (!isEnd) {
      if (currentPage < totalPages - maxPagesToShow) {
        links.push(
          <li key="end-ellipsis">
            <span css={paginationLinkStyles}>...</span>
          </li>
        );
      }
      links.push(
        <li key={totalPages}>
          <a css={paginationLinkStyles} onClick={() => onPageChange(totalPages)}>{totalPages}</a>
        </li>
      );
    }

    if (currentPage < totalPages) {
      links.push(
        <li key="next">
          <a css={paginationLinkStyles} onClick={() => onPageChange(currentPage + 1)}>Suivant &raquo;</a>
        </li>
      );
    }

    return links;
  };

  return (
    <ul css={paginationContainerStyles}>
      {createPaginationLinks()}
    </ul>
  );
};

export default Pagination;
