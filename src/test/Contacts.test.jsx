import * as React from "react";
import { render } from "@testing-library/react";
import { expect, vi } from "vitest";
import axios from "axios";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import user from "@testing-library/user-event";
import Contacts from "../pages/Contacts";
import { mockContacts, mockPending } from "./testUtils/MockData";

const mockAxios = new MockAdapter(axios);

describe("Contacts", () => {
  beforeEach(() => {
    sessionStorage.clear();
    sessionStorage.setItem("user", "1");
    mockAxios
      .onGet("http://localhost:3000/users/1/contacts")
      .reply(200, mockContacts);
    mockAxios
      .onGet("http://localhost:3000/users/1/pending")
      .reply(200, mockPending);
  });

  afterEach(() => {
    mockAxios.reset();
    vi.clearAllMocks();
  });

  it("should render the Contacts page", () => {
    const renderedComponent = render(<Contacts />);
    expect(renderedComponent).toMatchSnapshot();
  });
  it("should allow the user to type in the search bar", async () => {
    const renderedComponent = render(<Contacts />);
    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");
  });
  it("should render a list of online contacts", async () => {
    const renderedComponent = render(<Contacts />);
    const contacts = await renderedComponent.findAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
  it("should render a list of contacts that match the search when the user types in the search bar", async () => {
    const renderedComponent = render(<Contacts />);
    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "John");
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
  it("should render all contacts when the user clicks the 'All' tab", async () => {
    const renderedComponent = render(<Contacts />);
    const allTab = await renderedComponent.findByRole("tab", {
      name: /All contacts/i,
    });
    await user.click(allTab);
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(2);
  });
  it("should render a list of contacts that match the search when the user types in the search bar and clicks the 'All' tab", async () => {
    const renderedComponent = render(<Contacts />);
    const allTab = await renderedComponent.findByRole("tab", {
      name: /All contacts/i,
    });
    await user.click(allTab);

    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Jane");

    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
  it("should render a list of pending contacts when the user clicks the 'Pending' tab", async () => {
    const renderedComponent = render(<Contacts />);
    const pendingTab = await renderedComponent.findByRole("tab", {
      name: /Pending contacts/i,
    });
    await user.click(pendingTab);
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    renderedComponent.debug();
    expect(contacts).toHaveLength(3);
  });
  it("should render a list of contacts that match the search when the user types in the search bar and clicks the 'Pending' tab", async () => {
    const renderedComponent = render(<Contacts />);
    const pendingTab = await renderedComponent.findByRole("tab", {
      name: /Pending contacts/i,
    });
    await user.click(pendingTab);

    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Jane");

    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
});
