import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/Icons";
import { PaginationProps } from "./Pager.types";

export interface BasePagerProps extends PaginationProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classMap: Record<string, string>;
}

const BasePager: React.FC<BasePagerProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
  size = "small",
  theme = "primary",
  state = "",
  "data-testid": testId = "pager",
  Button,
  IconButton,
  classMap,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={`${classMap.wrapper} ${className}`}
      aria-label="Pagination Navigation"
      role="navigation"
      data-testid={testId}
    >
      <div className={classMap.controls}>
        <IconButton
          icon={ArrowLeftIcon}
          theme={theme}
          state={state}
          size={size}
          className={classMap.controlButton}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          title="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          data-testid={`${testId}-prev`}
        />
      </div>

      <div className={classMap.controls} role="list">
        {pages.map((page) => (
          <div
            key={page}
            className={classMap.buttonWrapper}
            data-testid={`${testId}-page-${page}`}
            role="listitem"
          >
            <Button
              theme={theme}
              state={state}
              size={size}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              disabled={page === currentPage}
              className={`${classMap.button} ${
                page === currentPage ? classMap.active : ""
              }`}
              data-testid={`${testId}-button-${page}`}
            >
              {page}
            </Button>
          </div>
        ))}
      </div>

      <div className={classMap.controls}>
        <IconButton
          icon={ArrowRightIcon}
          theme={theme}
          state={state}
          size={size}
          className={classMap.controlButton}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          title="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          data-testid={`${testId}-next`}
        />
      </div>
    </nav>
  );
};

export default BasePager;
