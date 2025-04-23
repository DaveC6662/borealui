import React from "react";

export const StoryGrid: React.FC<{
  title?: string;
  children: React.ReactNode;
  columns?: number;
}> = ({ title, children, columns = 3 }) => {
  return (
    <div style={{ marginBottom: "2rem" }}>
      {title && <h3 style={{ marginBottom: "1rem" }}>{title}</h3>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
};
