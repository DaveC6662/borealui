import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../Icons";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";
import { BasePagerProps } from "./Pager.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";

const BasePager: React.FC<BasePagerProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  serverControlled = false,
  onPageChange,
  className = "",
  size = getDefaultSize(),
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  "data-testid": testId = "pager",
  Button,
  IconButton,
  classMap,
}) => {
  const perPage = Math.max(1, itemsPerPage || 1);
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const page = Math.min(Math.max(1, currentPage || 1), totalPages);

  const pages = serverControlled
    ? []
    : Array.from({ length: totalPages }, (_, i) => i + 1);

  const goTo = (p: number) => {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (clamped !== page) onPageChange(clamped);
  };

  const wrapperClass = combineClassNames(classMap.wrapper, className);
  const buttonBaseClass = combineClassNames(
    classMap.button,
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`]
  );

  return (
    <nav aria-label="Pagination" className={wrapperClass} data-testid={testId}>
      <p className="sr_only" aria-live="polite">
        Page {page} of {totalPages}
      </p>

      <div className={classMap.controls}>
        <IconButton
          icon={ArrowLeftIcon}
          theme={theme}
          state={state}
          size={size}
          shadow={shadow}
          rounding={rounding}
          className={classMap.controlButton}
          disabled={page <= 1}
          ariaLabel={`Go to page ${Math.max(1, page - 1)}`}
          title="Previous page"
          onClick={() => goTo(page - 1)}
          data-testid={`${testId}-prev`}
          type="button"
        />
      </div>

      <ul className={classMap.controls}>
        {serverControlled ? (
          <li
            className={classMap.buttonWrapper}
            data-testid={`${testId}-page-${page}`}
          >
            <Button
              theme={theme}
              state={state}
              size={size}
              rounding={rounding}
              shadow={shadow}
              onClick={() => goTo(page)}
              aria-label={`Page ${page}`}
              aria-current="page"
              disabled
              className={combineClassNames(buttonBaseClass, classMap.active)}
              data-testid={`${testId}-button-${page}`}
              type="button"
            >
              {page}
            </Button>
          </li>
        ) : (
          pages.map((p) => {
            const isActive = p === page;
            return (
              <li
                key={p}
                className={classMap.buttonWrapper}
                data-testid={`${testId}-page-${p}`}
              >
                <Button
                  theme={theme}
                  state={state}
                  size={size}
                  rounding={rounding}
                  shadow={shadow}
                  onClick={() => goTo(p)}
                  aria-label={isActive ? `Page ${p}` : `Go to page ${p}`}
                  aria-current={isActive ? "page" : undefined}
                  disabled={isActive}
                  className={combineClassNames(
                    buttonBaseClass,
                    isActive && classMap.active
                  )}
                  data-testid={`${testId}-button-${p}`}
                  type="button"
                >
                  {p}
                </Button>
              </li>
            );
          })
        )}
      </ul>

      <div className={classMap.controls}>
        <IconButton
          icon={ArrowRightIcon}
          theme={theme}
          state={state}
          rounding={rounding}
          shadow={shadow}
          size={size}
          className={classMap.controlButton}
          disabled={page >= totalPages}
          ariaLabel={`Go to page ${Math.min(totalPages, page + 1)}`}
          title="Next page"
          onClick={() => goTo(page + 1)}
          data-testid={`${testId}-next`}
          type="button"
        />
      </div>
    </nav>
  );
};

BasePager.displayName = "BasePager";
export default BasePager;
