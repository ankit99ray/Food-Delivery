import { Provider } from "react-redux";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import appStore from "../utils/appStore";
import { fireEvent,render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import { CART_ICON } from "../utils/constants";
import { act } from "react";

it("should render Header component with login button", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login"});
    expect(loginButton).toBeInTheDocument();

});


it("should render Header component with Cart items", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const cartItems = screen.getByText(/Cart/);
    expect(cartItems).toBeInTheDocument();

});

it("Should render Header component and cchange the Login button to logout on click", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );
    const loginButton = screen.getByRole("button", {name: "Login"});

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button", {name: "Logout"});
    
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    
    expect(loginButton).toBeInTheDocument();

});

it("Should render Header component with online and offline status",() => {
   render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    // Mock the event handler
    const handleOnlineStatusChange = jest.fn();

    // Add event listeners for online and offline events
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Simulate going offline
    window.dispatchEvent(new Event('offline'));
    expect(handleOnlineStatusChange).toHaveBeenCalledTimes(1);

    // Simulate going online
    window.dispatchEvent(new Event('online'));
    expect(handleOnlineStatusChange).toHaveBeenCalledTimes(2);

    // Clean up
    window.removeEventListener('online', handleOnlineStatusChange);
    window.removeEventListener('offline', handleOnlineStatusChange);

});