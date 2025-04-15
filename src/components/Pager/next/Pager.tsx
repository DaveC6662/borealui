"use client";

import React, { JSX } from "react";
import { Button, IconButton } from "@/index.next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./Pager.module.scss";
import { PaginationProps } from "../Pager.types";

/**
 * Pager is a pagination component that provides navigation
 * through pages of content. It displays navigation buttons and
 * page numbers, with support for keyboard and assistive technology 
 * accessibility attributes.
 *
 * @param {PaginationProps} props - The props for configuring the pagination.
 * @returns {JSX.Element} A navigational component for paginated content.
 */
const Pager: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className = "",
  size = "small",
  theme = "primary",
  "data-testid": testId = "pager",
}: PaginationProps): JSX.Element => {
  
  // Calculate the total number of pages from the total items and items per page.
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create an array for each page number (1-indexed).
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className={`${styles.pagination} ${className}`}
      aria-label="Pagination"
      data-testid={testId}
    >
      {/* Previous Page Button */}
      <div className={styles.paginationControls}>
        <IconButton
          icon={FaArrowLeft}
          theme={theme}
          size={size}
          className={styles.paginationControlButton}
          disabled={currentPage === 1}
          ariaLabel="Previous Page"
          title="Previous Page"
          onClick={() => onPageChange(currentPage - 1)}
          data-testid={`${testId}-prev`}
        />
      </div>

      {/* Page Number Buttons */}
      <div className={styles.paginationButtons}>
        {pages.map((page) => (
          <div
            key={page}
            className={styles.paginationButtonWrapper}
            data-testid={`${testId}-page-${page}`}
          >
            <Button
              theme={theme}
              size={size}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`${styles.paginationButton} ${
                page === currentPage ? styles.active : ""
              }`}
              disabled={page === currentPage}
              data-testid={`${testId}-button-${page}`}
            >
              {page}
            </Button>
          </div>
        ))}
      </div>

      {/* Next Page Button */}
      <div className={styles.paginationControls}>
        <IconButton
          icon={FaArrowRight}
          theme={theme}
          size={size}
          className={styles.paginationControlButton}
          disabled={currentPage === totalPages}
          ariaLabel="Next Page"
          title="Next Page"
          onClick={() => onPageChange(currentPage + 1)}
          data-testid={`${testId}-next`}
        />
      </div>
    </nav>
  );
};

export default Pager;
