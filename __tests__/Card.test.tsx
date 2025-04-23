import { render, screen } from "@testing-library/react";
import CardBase from "@/components/Card/CardBase";

const DummySkeleton = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => <div data-testid="skeleton" style={{ width, height }} />;

const DummyImage = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} data-testid="card-image" />
);

const DummyButton = ({ children, ...props }: any) => (
  <button {...props}>{children}</button>
);

const DummyIconButton = ({ icon: Icon, ...props }: any) => (
  <button {...props}>{Icon && <Icon data-testid="card-icon" />}</button>
);

const classMap = {
  card: "card",
  solid: "solid",
  primary: "primary",
  cardLoading: "loading",
  cardContent: "card-content",
  fadeIn: "fade-in",
  vertical: "vertical",
  cardImage: "card-img",
  cardHeader: "card-header",
  cardTitle: "card-title",
  cardIcon: "card-icon",
  cardBody: "card-body",
  cardDescription: "card-desc",
  cardChildren: "card-children",
  cardFooter: "card-footer",
  cardActions: "card-actions",
  actionButton: "action-btn",
};

describe("CardBase", () => {
  it("renders title, description, and action button", () => {
    render(
      <CardBase
        title="Card Title"
        description="Card description"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        actionButtons={[
          {
            label: "Click Me",
            onClick: jest.fn(),
            buttonComponent: DummyButton,
            iconButtonComponent: DummyIconButton,
          },
        ]}
      />
    );

    expect(screen.getByRole("region")).toHaveAttribute("aria-labelledby");
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  it("renders image and loading state", () => {
    render(
      <CardBase
        loading={true}
        imageUrl="/img.jpg"
        imageAlt="Example image"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        actionButtons={[]}
      />
    );

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });
});
