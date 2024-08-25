import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../components/Body";
import MOCK_DATA from "./mocks/ResListFetchMock.json";
// import {act} from "react-dom/test-utils"
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("Should search the restaurant cards for the input burger", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ));

    const cardsBeforeSearch = screen.getAllByTestId("ResCard");

    expect(cardsBeforeSearch.length).toBe(8);

    const searchBtn = screen.getByRole("button", {name: "Search"});

    const searchInputBox = screen.getByTestId("SearchInput");

    expect(searchBtn).toBeInTheDocument();

    fireEvent.change(searchInputBox, {target: { value: "burger"}});

    fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("ResCard");

    expect(cardsAfterSearch.length).toBe(2);

});


it("Should render the body component and show top rated restaurants", async () => {
    await act( async () => render(
       <BrowserRouter>
            <Body/>
       </BrowserRouter> 
    ));

    const resCards = screen.getAllByTestId("ResCard");

    expect(resCards.length).toBe(8);

    const topRatedButton = screen.getByRole("button", {name: "Top Rated Restaurants"});

    expect(topRatedButton).toBeInTheDocument();

    fireEvent.click(topRatedButton);

    const topRatedResCards = screen.getAllByTestId("ResCard");

    expect(topRatedResCards.length).toBe(1);
});