import { render, screen } from "@testing-library/react"
import { act } from "react"
import Header from "../components/Header";
import Body from "../components/Body"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import "@testing-library/jest-dom"
import MOCK_DATA from "./mocks/ResListFetchMock.json"

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });
});

it("Should check the username and reflect the changes when we change it", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
                <Body/>
            </Provider>
        </BrowserRouter>
    ));

    const userNameInput = screen.getByTestId("UserNameInput");

    expect(userNameInput).toBeInTheDocument();
});