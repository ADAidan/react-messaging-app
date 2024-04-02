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
    const initialSelectedChat = 1;

    const setSelectedChat = vi.fn();

    const chat = {
      id: initialSelectedChat,
      username: "testuser",
    };

    const { user, ...renderedComponent } = setup(
      <ChatCard chat={chat} setSelectedChat={setSelectedChat} />,
    );

    const ChatCardElement = renderedComponent.findByTestId("chat-card");
    user.click(ChatCardElement);
    expect(setSelectedChat).toHaveBeenCalledWith(initialSelectedChat);
  });
});
