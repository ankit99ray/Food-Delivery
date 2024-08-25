import { CDN_URL } from "../utils/constants";
import Offer from "./Offer";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

const RestaurantCard = (props) => {
    const {resData} = props;
    // console.log(resData);
    const {loggedInUser} = useContext(UserContext);
    const {cloudinaryImageId, name, cuisines, avgRating, sla, } = resData?.info;
    const offer = resData?.info?.aggregatedDiscountInfoV3;
    return (
        <div data-testid="ResCard" className="restaurantCard hover:scale-[0.95] hover:-translate-y-1 duration-200 ease-in-out mx-4 my-4 w-[253px] rounded-xl cursor-pointer">
            <div className="relative">
                <img 
                    className="rounded-xl w-full h-[169px] object-cover"
                    alt="res-logo"
                    src={ CDN_URL + cloudinaryImageId}
                />
                <Offer {...offer}/>
            </div>
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h4 className="m-1 pr-4"> {avgRating}⭐ - {sla.deliveryTime} minutes</h4>
            <h4 className="m-1 pr-4">{cuisines.join(", ")}</h4>
            <p className="m-1 pr-4">User: {loggedInUser}</p>
        </div>
    )
}

// export const withTopRatedLabel = (RestaurantCard) => {
//     return (props) => {
//         return (
//             <div className="relative">
//                 <label className="absolute 
//                         text-white
//                         bg-gray-700
//                         z-10"
//                     >Top Rated</label>
//                 <RestaurantCard {...props}/>
//             </div>
//         )
//     }
// }

export default RestaurantCard;