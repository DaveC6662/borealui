import React from "react";
import { StoryGrid } from "./StoryGrid";

type VariantProps<T> = {
  propName: keyof T;
  values: T[keyof T][];
};

export function withVariants<T extends object>(
  Component: React.FC<T>,
  baseProps: T,
  variants: VariantProps<T>[]
) {
  return variants.map(({ propName, values }) => {
    const propKey = String(propName);

    return (
      <StoryGrid key={propKey} title={propKey}>
        {values.map((value, idx) => {
          const props = {
            ...baseProps,
            [propName]: value,
          } as T;

          return (
            <Component key={`${propKey}-${String(value)}-${idx}`} {...props} />
          );
        })}
      </StoryGrid>
    );
  });
}
