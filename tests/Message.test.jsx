import * as React from "react";
import { render, screen } from "@testing-library/react";
import Message from "../client/components/Message";

test("renders Messages component", () => {
  const message = {
    _id: "1",
    author: {
      username: "John",
    },
    content: "Hello, World!",
    formattedTime: "12:00 PM",
  };

  render(<Message message={message} />);
  const authorElement = screen.getByText(message.author.username);
  const messageElement = screen.getByText(message.content);
  const timeElement = screen.getByText(message.formattedTime);
  expect(authorElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
  expect(timeElement).toBeInTheDocument();
});
