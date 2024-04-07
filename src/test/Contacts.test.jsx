import * as React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import Contacts from "../pages/Contacts";
import UserContext from "../Context";
import UserContextValue from "./testUtils/UserContextValue";

describe("Contacts", () => {
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
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(3);
  });
  it("should render a list of contacts that match the search when the user types in the search bar", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Seymour");
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
  it("should render all contacts when the user clicks the 'All' tab", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const allTab = await renderedComponent.findByRole("tab", {
      name: /All contacts/i,
    });
    await user.click(allTab);
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(6);
  });
  it("should render a list of contacts that match the search when the user types in the search bar and clicks the 'All' tab", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const allTab = await renderedComponent.findByRole("tab", {
      name: /All contacts/i,
    });
    await user.click(allTab);

    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Brooks");

    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
  it("should render a list of pending contacts when the user clicks the 'Pending' tab", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const pendingTab = await renderedComponent.findByRole("tab", {
      name: /Pending contacts/i,
    });
    await user.click(pendingTab);
    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(3);
  });
  it("should render a list of contacts that match the search when the user types in the search bar and clicks the 'Pending' tab", async () => {
    const renderedComponent = render(
      <UserContext.Provider value={UserContextValue}>
        <Contacts />
      </UserContext.Provider>,
    );
    const pendingTab = await renderedComponent.findByRole("tab", {
      name: /Pending contacts/i,
    });
    await user.click(pendingTab);

    const searchInput = await renderedComponent.findByRole("textbox", {
      name: /search/i,
    });
    await user.type(searchInput, "Sophia");

    const contacts = renderedComponent.queryAllByTestId("contact-card");
    expect(contacts).toHaveLength(1);
  });
});
