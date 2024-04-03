import * as React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import Messages from "../pages/Messages";
import UserContext from "../Context";
import UserContextValue from "./testUtils/UserContextValue";

describe("Messages", () => {
  it("should render the Direct Message container", () => {
    const renderedComponent = render(<Messages />);
    const headerElement = renderedComponent.getByRole("heading", {
      name: /Direct Message/i,
    });
    expect(headerElement).toBeInTheDocument();
  });
  it("should render the messages container", () => {
    const renderedComponent = render(<Messages />);
    const messagesContainer =
      renderedComponent.getByTestId("messages-container");
    expect(messagesContainer).toBeInTheDocument();
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
  it("should clear the message input when the user submits message", async () => {
    const renderedComponent = render(<Messages />);

    const messageInput = await renderedComponent.findByRole("textbox", {
      name: /Message/i,
    });
    await user.type(messageInput, "Hello, World!");
    expect(messageInput).toHaveValue("Hello, World!");

    const sendMessageButton = await renderedComponent.findByRole("button", {
      name: /send message/i,
    });
    await user.click(sendMessageButton);
    expect(messageInput).toHaveValue("");
  });
  it("should not add a new message when the message input is empty", async () => {
    const renderedComponent = render(<Messages />);

    const sendMessageButton = await renderedComponent.findByRole("button", {
      name: /send message/i,
    });
    await user.click(sendMessageButton);

    const messages = renderedComponent.queryAllByTestId("message");
    expect(messages.length).toBe(0);
  });
  it("should change displayed messages when the user clicks another chat", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Messages />
      </UserContext.Provider>,
    );

    let chat = renderedComponent.queryByTestId("chat-1");
    expect(chat).toBeInTheDocument();

    const chatButton =
      await renderedComponent.findByLabelText(/Kaiya Mccarthy/i);
    await user.click(chatButton);

    chat = renderedComponent.queryByTestId("chat-2");
    expect(chat).toBeInTheDocument();
  });
  it("should display a message when there are no messages", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Messages />
      </UserContext.Provider>,
    );
    const chatButton =
      await renderedComponent.findByLabelText(/Kaiya Mccarthy/i);
    await user.click(chatButton);

    const noMessages = await renderedComponent.findByText(
      /Looks like there are no messages yet! How about starting with hello/i,
    );
    expect(noMessages).toBeInTheDocument();
  });
});
