import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantMenuCategory from "./RestaurantMenuCategory";
// import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {

    const [showIndex, setShowIndex] = useState(null);
    
    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);
    
    if(resInfo == null){
        return <Shimmer/>;
    }

    const {name, cuisines, avgRating, costForTwoMessage, id} = 
        resInfo?.cards[2]?.card?.card?.info;

    // console.log(itemCards);

    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(c => c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    return (
        <div className="menu text-center">
            <h1 className="my-4 text-2xl font-bold">{name} - {avgRating} stars</h1>
            <p className="font-bold my-2">{cuisines.join(", ")} - {costForTwoMessage}</p>
            <div>
                {categories.map((category, index)=> <RestaurantMenuCategory 
                        key={category?.card?.card?.title} 
                        data={category?.card?.card}
                        showItemIndex={index == showIndex ? true:false}
                        setShowItemIndex = {() => (showIndex!=index ? setShowIndex(index):setShowIndex(null))}
                        />
                    )}
            </div>
        </div>
    )
}

export default RestaurantMenu;