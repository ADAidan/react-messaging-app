import * as React from "react";
import { render, screen, describe, expect, it } from "@testing-library/react";
import Messages from "../pages/Messages";

describe("Messages", () => {
  it("should render the Direct Message header", () => {
    render(<Messages />);
    const headerElement = screen.getByRole("heading", {
      name: /Direct Message/i,
    });
    expect(headerElement).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: /Message/i });
    expect(searchInput).toBeInTheDocument();
  });
});
