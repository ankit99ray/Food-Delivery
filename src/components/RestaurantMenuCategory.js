import { DOWN_ARROW_ICON , UP_ARROW_ICON} from "../utils/constants";
import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantMenuCategory = ({data, showItemIndex, setShowItemIndex}) => {
    // console.log(data);

    return (
        <div>
            <div className="shadow-lg w-6/12 mx-auto my-4 p-4 bg-gray-50">
                <div className="flex justify-between cursor-pointer"
                    onClick={() => {
                        setShowItemIndex();
                    }}>
                    <span>{data.title} ({data?.itemCards.length})</span>
                    <span>{showItemIndex? UP_ARROW_ICON:DOWN_ARROW_ICON}</span>
                </div>
                {showItemIndex && <ItemList items={data.itemCards} btn={"ADD+"}/>}
            </div>
        </div>
    )
}

export default RestaurantMenuCategory;