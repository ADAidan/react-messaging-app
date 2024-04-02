import * as React from "react";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import ChatCard from "../components/ChatCard";

describe("ChatCard", () => {
  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

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

  it("should change the selected chat when clicked", () => {
    const [selectedChat, setSelectedChat] = React.useState(3);

    const chat = {
      id: 3,
      username: "testuser",
    };

    const { user } = setup(
      <ChatCard chat={chat} setSelectedChat={setSelectedChat} />,
    );

    user.click(screen.getByTestId("chat-card"));
    expect(selectedChat).toBe(3);
  });
});
