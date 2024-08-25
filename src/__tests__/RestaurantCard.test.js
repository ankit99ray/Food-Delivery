
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"
import MOCK_DATA from "./mocks/RestaurantCardMock.json"
import RestaurantCard from "../components/RestaurantCard";

it("Should render restaurant card component with props data", () => {
    render(<RestaurantCard resData={MOCK_DATA}/>);

    const resCard = screen.getByText("KFC");

    expect(resCard).toBeInTheDocument();

});