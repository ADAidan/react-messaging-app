import * as React from "react";
import { render, screen } from "@testing-library/react";
import ChatCard from "../components/ChatCard";

describe("ChatCard", () => {
  it("should render the ChatCard component", () => {
    const chat = {
      _id: 1,
      contactId: 1,
      username: "testuser",
      status: "Online",
      profilePicture: "",
      messages: [
        {
          _id: 1,
          author: {
            _id: 1,
            username: "testuser",
          },
          content: "Lorem ipsum dolor sit amet...",
          createdAt: "2021-09-01T00:00:00.000Z",
          updatedAt: "2021-09-01T00:00:00.000Z",
        },
      ],
    };
    render(<ChatCard chat={chat} />);
    const usernameElement = screen.getByText(/testuser/i);
    expect(usernameElement).toBeInTheDocument();

    const lastMessageElement = screen.getByText(
      /Lorem ipsum dolor sit amet.../i,
    );
    expect(lastMessageElement).toBeInTheDocument();
  });
});
