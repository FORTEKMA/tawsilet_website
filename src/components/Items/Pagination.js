import React from "react";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const PageButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  padding: 5px 10px;
  margin: 0 2px;
  border: none;
  background-color: ${({ active }) => (active ? "#d8b56c" : "#ddd")};
  color: ${({ active }) => (active ? "#333" : "#333")};
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination = ({ pageCount, current, onPageChange }) => {
  const MAX_VISIBLE_PAGES = 5;

  const totalPages = pageCount || 1;

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <PageButton
            key={i}
            active={i === current}
            onClick={() => onPageChange(i)}
          >
            {String(i).padStart(2, "0")}
          </PageButton>
        );
      }
    } else {
      const showEllipsis = totalPages > MAX_VISIBLE_PAGES;
      const centerPage = Math.ceil(MAX_VISIBLE_PAGES / 2);

      if (current <= centerPage) {
        for (let i = 1; i <= MAX_VISIBLE_PAGES - 1; i++) {
          pageButtons.push(
            <PageButton
              key={i}
              active={i === current}
              onClick={() => onPageChange(i)}
            >
              {String(i).padStart(2, "0")}
            </PageButton>
          );
        }
        if (showEllipsis) {
          pageButtons.push(<PageButton key="end-ellipsis">...</PageButton>);
          pageButtons.push(
            <PageButton
              key={totalPages}
              onClick={() => onPageChange(totalPages)}
            >
              {String(totalPages).padStart(2, "0")}
            </PageButton>
          );
        }
      } else if (current >= totalPages - centerPage + 1) {
        if (showEllipsis) {
          pageButtons.push(
            <PageButton key={1} onClick={() => onPageChange(1)}>
              {String(1).padStart(2, "0")}
            </PageButton>
          );
          pageButtons.push(<PageButton key="start-ellipsis">...</PageButton>);
        }
        for (let i = totalPages - MAX_VISIBLE_PAGES + 2; i <= totalPages; i++) {
          pageButtons.push(
            <PageButton
              key={i}
              active={i === current}
              onClick={() => onPageChange(i)}
            >
              {String(i).padStart(2, "0")}
            </PageButton>
          );
        }
      } else {
        if (showEllipsis) {
          pageButtons.push(
            <PageButton key={1} onClick={() => onPageChange(1)}>
              {String(1).padStart(2, "0")}
            </PageButton>
          );
          pageButtons.push(<PageButton key="start-ellipsis">...</PageButton>);
        }
        const ellipsisStart = current - centerPage + 1;
        const ellipsisEnd = current + centerPage - 1;
        for (let i = ellipsisStart; i <= ellipsisEnd; i++) {
          pageButtons.push(
            <PageButton
              key={i}
              active={i === current}
              onClick={() => onPageChange(i)}
            >
              {String(i).padStart(2, "0")}
            </PageButton>
          );
        }
        if (showEllipsis) {
          pageButtons.push(<PageButton key="end-ellipsis">...</PageButton>);
          pageButtons.push(
            <PageButton
              key={totalPages}
              onClick={() => onPageChange(totalPages)}
            >
              {String(totalPages).padStart(2, "0")}
            </PageButton>
          );
        }
      }
    }

    return pageButtons;
  };

  return (
    <PaginationWrapper>
      <PageButton
        disabled={current === 1}
        onClick={() => onPageChange(current - 1)}
      >
        <p>{`<`}</p>
      </PageButton>
      {renderPageButtons()}
      <PageButton
        disabled={current === totalPages}
        onClick={() => onPageChange(current + 1)}
      >
        <p>{`>`}</p>
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
