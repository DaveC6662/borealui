import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../Icons";
import { PaginationProps } from "./Pager.types";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "../../config/boreal-style-config";

export interface BasePagerProps extends PaginationProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classMap: Record<string, string>;
}

const BasePager: React.FC<BasePagerProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  serverControlled = false,
  onPageChange,
  className = "",
  size = defaultSize,
  theme = defaultTheme,
  rounding = defaultRounding,
  shadow = defaultShadow,
  state = "",
  "data-testid": testId = "pager",
  Button,
  IconButton,
  classMap,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = serverControlled
    ? []
    : Array.from({ length: totalPages }, (_, i) => i + 1);

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
          shadow={shadow}
          rounding={rounding}
          className={classMap.controlButton}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          title="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          data-testid={`${testId}-prev`}
        />
      </div>

      <div className={classMap.controls} role="list">
        {serverControlled ? (
          <div
            className={classMap.buttonWrapper}
            role="listitem"
            data-testid={`${testId}-page-${currentPage}`}
          >
            <Button
              theme={theme}
              state={state}
              size={size}
              rounding={rounding}
              shadow={shadow}
              onClick={() => onPageChange(currentPage)}
              aria-label={`Page ${currentPage}`}
              aria-current="page"
              disabled
              className={`${classMap.button} ${classMap.active}`}
              data-testid={`${testId}-button-${currentPage}`}
            >
              {currentPage}
            </Button>
          </div>
        ) : (
          pages.map((page) => (
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
                rounding={rounding}
                shadow={shadow}
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
          ))
        )}
      </div>

      <div className={classMap.controls}>
        <IconButton
          icon={ArrowRightIcon}
          theme={theme}
          state={state}
          rounding={rounding}
          shadow={shadow}
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
