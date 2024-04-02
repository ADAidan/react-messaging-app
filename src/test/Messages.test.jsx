import * as React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Messages from "../pages/Messages";

describe("Messages", () => {
  it("should render the Direct Message container", () => {
    render(<Messages />);
    const headerElement = screen.getByRole("heading", {
      name: /Direct Message/i,
    });
    expect(headerElement).toBeInTheDocument();

    const searchInput = screen.getByRole("textbox", { name: /Message/i });
    expect(searchInput).toBeInTheDocument();
  });
  it("should add a new message", async () => {
    const renderedComponent = render(<Messages />);

    const messageInput = await renderedComponent.findByRole("textbox", {
      name: /Message/i,
    });
    await user.type(messageInput, "Hello, World!");

    const sendMessageButton = await renderedComponent.findByRole("button", {
      name: /send message/i,
    });
    await user.click(sendMessageButton);

    const messages = renderedComponent.queryAllByTestId("message");
    expect(messages.length).toBe(1);
  });
});
