import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react"
import RestaurantMenu from "../components/RestaurantMenu"
import MOCK_DATA from "./mocks/ResMenuMock.json"
import "@testing-library/jest-dom"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Header from "../components/Header"
import Cart from "../components/Cart"
import { BrowserRouter } from "react-router-dom"
//I'm using Burger Singhs Mock Data

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("Should check the working of add buttons in res menu and clear cart button in cart", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenu/>
                <Cart/>
            </Provider>
        </BrowserRouter>
        
    ));

    const accordianHeader = screen.getByText(/Recommended/);

    expect(accordianHeader).toBeInTheDocument();

    fireEvent.click(accordianHeader);

    const itemListAfterClickingAccordianHeader = screen.getAllByTestId("FoodItems");

    expect(itemListAfterClickingAccordianHeader.length).toBe(15);

    const addBtns = screen.getAllByRole("button", {name: "ADD+"});

    // console.log(addBtns.length);

    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart(1)")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart(2)")).toBeInTheDocument();

    const foodItems = screen.getAllByTestId("FoodItems");

    expect(foodItems.length).toBe(17); //15 from the restaurant menu, and 2 from the cart

    const clearCartBtn = screen.getByRole("button", {name: "Clear Cart"});

    expect(clearCartBtn).toBeInTheDocument();

    fireEvent.click(clearCartBtn);

    const foodItemsAfterClickingClearCart = screen.getAllByTestId("FoodItems");

    expect(foodItemsAfterClickingClearCart.length).toBe(15);
});

it("Should check the working of remove buttons in cart", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <RestaurantMenu/>
                <Cart/>
            </Provider>
        </BrowserRouter>
        
    ));

    const accordianHeader = screen.getByText(/Recommended/);

    expect(accordianHeader).toBeInTheDocument();

    fireEvent.click(accordianHeader);

    const itemListAfterClickingAccordianHeader = screen.getAllByTestId("FoodItems");

    expect(itemListAfterClickingAccordianHeader.length).toBe(15);

    const addBtns = screen.getAllByRole("button", {name: "ADD+"});

    // console.log(addBtns.length);

    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart(1)")).toBeInTheDocument();

    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart(2)")).toBeInTheDocument();

    const foodItems = screen.getAllByTestId("FoodItems");

    expect(foodItems.length).toBe(17); //15 from the restaurant menu, and 2 from the cart

    const removeBtns = screen.getAllByRole("button", {name: "Remove-"});

    expect(removeBtns.length).toBe(2);

    fireEvent.click(removeBtns[1]);

    expect(screen.getByText("Cart(1)")).toBeInTheDocument();

    fireEvent.click(removeBtns[0]);

    expect(screen.getByText("Cart(0)")).toBeInTheDocument();

});