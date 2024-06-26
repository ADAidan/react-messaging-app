/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import axios from "axios";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import Messages from "../client/pages/Messages";
import mockData from "./testUtils/MockData";

const mockAxios = new MockAdapter(axios);

describe("Messages", () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("user", "1");
    mockAxios
      .onGet("http://localhost:3000/users/1/direct-messages")
      .reply(200, mockData);
    mockAxios
      .onPut("http://localhost:3000/users/send-message")
      .reply(200, { success: true });
  });

  afterEach(() => {
    mockAxios.reset();
    vi.clearAllMocks();
  });

  it("should render the Direct Message Component", () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    expect(renderedComponent).toMatchSnapshot();
  });
  it("fetches and displays direct messages", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(renderedComponent.getByTestId("message-author")).toHaveTextContent(
        "John"
      );
      expect(renderedComponent.getByTestId("message-text")).toHaveTextContent(
        "Hello"
      );
      expect(renderedComponent.getByTestId("message-time")).toHaveTextContent(
        "12:00 PM"
      );
    });
  });
  it("should add a new message", async () => {
    const mockSpy = vi.spyOn(axios, "put");
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const messageInput = await renderedComponent.findByRole("textbox", {
      name: /Message/i,
    });
    await user.type(messageInput, "Hello, World!");

    const sendMessageButton = await renderedComponent.findByRole("button", {
      name: /send message/i,
    });
    await user.click(sendMessageButton);

    await waitFor(() => {
      expect(mockSpy).toHaveBeenCalledWith(
        "http://localhost:3000/users/send-message",
        {
          userId: "1",
          conversationId: "1",
          messageContent: "Hello, World!",
        }
      );
    });
  });
  it("should clear the message input when the user submits message", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
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
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const sendMessageButton = await renderedComponent.findByRole("button", {
      name: /send message/i,
    });
    await user.click(sendMessageButton);

    const messages = renderedComponent.queryAllByTestId("message");
    expect(messages.length).toBe(1);
  });
  it("should change displayed messages when the user clicks another chat", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const chat = await renderedComponent.findByTestId("message-text");
    expect(chat).toHaveTextContent("Hello");

    const chatButton = await renderedComponent.findByLabelText(/Jane/i);
    await user.click(chatButton);

    const noMessages = await renderedComponent.findByText(
      /Looks like there are no messages yet! How about starting with hello\?/i
    );
    expect(noMessages).toBeInTheDocument();
  });
  it("should display a message when there are no messages", async () => {
    const renderedComponent = render(
      <MemoryRouter>
        <Messages />
      </MemoryRouter>
    );
    const chatButton = await renderedComponent.findByLabelText(/Jane/i);
    await user.click(chatButton);

    const noMessages = await renderedComponent.findByText(
      /Looks like there are no messages yet! How about starting with hello\?/i
    );
    expect(noMessages).toBeInTheDocument();
  });
});
