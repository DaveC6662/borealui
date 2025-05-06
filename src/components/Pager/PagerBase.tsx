import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@/Icons";
import { PaginationProps } from "./Pager.types";

export interface BasePagerProps extends PaginationProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    controls: string;
    controlButton: string;
    buttonWrapper: string;
    button: string;
    active: string;
  };
}

const BasePager: React.FC<BasePagerProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
  size = "small",
  theme = "primary",
  "data-testid": testId = "pager",
  Button,
  IconButton,
  classNames,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={`${classNames.wrapper} ${className}`}
      aria-label="Pagination Navigation"
      role="navigation"
      data-testid={testId}
    >
      <div className={classNames.controls}>
        <IconButton
          icon={ArrowLeftIcon}
          theme={theme}
          size={size}
          className={classNames.controlButton}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          title="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          data-testid={`${testId}-prev`}
        />
      </div>

      <div className={classNames.controls} role="list">
        {pages.map((page) => (
          <div
            key={page}
            className={classNames.buttonWrapper}
            data-testid={`${testId}-page-${page}`}
            role="listitem"
          >
            <Button
              theme={theme}
              size={size}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              disabled={page === currentPage}
              className={`${classNames.button} ${
                page === currentPage ? classNames.active : ""
              }`}
              data-testid={`${testId}-button-${page}`}
            >
              {page}
            </Button>
          </div>
        ))}
      </div>

      <div className={classNames.controls}>
        <IconButton
          icon={ArrowRightIcon}
          theme={theme}
          size={size}
          className={classNames.controlButton}
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
