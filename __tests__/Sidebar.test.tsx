import { render } from "@testing-library/react";
import SidebarBase from "../src/components/Sidebar/SidebarBase";

const classMap = {};

describe("SidebarBase", () => {
  it("renders without crashing", () => {
    render(<SidebarBase classMap={classMap} />);
  });
});
