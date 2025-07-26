import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import CardBase from "@/components/Card/CardBase";

expect.extend(toHaveNoViolations);

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
  loading: "loading",
  content: "card-content",
  fadeIn: "fade-in",
  vertical: "vertical",
  image: "card-img",
  header: "card-header",
  title: "card-title",
  icon: "card-icon",
  body: "card-body",
  description: "card-desc",
  children: "card-children",
  footer: "card-footer",
  actions: "card-actions",
  action_button: "action-btn",
  center: "card-center",
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

    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-labelledby");

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  it("renders skeleton when loading is true", () => {
    render(
      <CardBase
        loading
        imageUrl="/img.jpg"
        imageAlt="Example image"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        actionButtons={[]}
      />
    );

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByRole("region")).toBeInTheDocument();
    expect(screen.queryByTestId("card-image")).not.toBeInTheDocument();
  });

  it("renders image when not loading", () => {
    render(
      <CardBase
        imageUrl="/img.jpg"
        imageAlt="Example image"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        ImageComponent={DummyImage}
        actionButtons={[]}
        title="Image Card"
      />
    );

    expect(screen.getByTestId("card-image")).toBeInTheDocument();
    expect(screen.getByAltText("Example image")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CardBase
        title="Accessible Card"
        description="This card is for accessibility testing"
        imageUrl="/img.jpg"
        imageAlt="Accessible image"
        classMap={classMap}
        SkeletonComponent={DummySkeleton}
        ImageComponent={DummyImage}
        actionButtons={[
          {
            label: "Learn More",
            onClick: jest.fn(),
            buttonComponent: DummyButton,
            iconButtonComponent: DummyIconButton,
          },
        ]}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
