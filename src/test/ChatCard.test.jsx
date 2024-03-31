import * as React from "react";
import { render, screen, describe, expect, it } from "@testing-library/react";
import ChatCard from "../components/ChatCard";

describe("ChatCard", () => {
  it("should render the ChatCard component", () => {
    const chat = {
      id: 1,
      username: "testuser",
    };
    render(<ChatCard chat={chat} />);
    const usernameElement = screen.getByText(/testuser/i);
    expect(usernameElement).toBeInTheDocument();

    const mottoElement = screen.getByText(/Lorem ipsum dolor sit amet.../i);
    expect(mottoElement).toBeInTheDocument();
  });
});
