import RestaurantCard, { withTopRatedLabel }from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { SEARCH_ICON } from "../utils/constants";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    //we can also write it like this
    /* 
        const arr = useState(resList);
        const listOfRestaurants = arr[0];
        const setListOfRestaurants = arr[1];
    */
    
        //higher order component
        // const RestaurantCardTopRated = withTopRatedLabel(RestaurantCard);
    const [searchText, setSearchText] = useState("");

    //React context concept (just like global variable but not global variable)
    const {loggedInUser, setUserName} = useContext(UserContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        const json = await data.json();
        // console.log(json);
        //optional chaining
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);  
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);      
    }

    const onlineStatus = useOnlineStatus();
    if(onlineStatus == false){
        return (
            <h1>
                Oops!! Something went wrong. Looks like you are offline.
            </h1>
        )
    }

    //conditional rendering
    if(listOfRestaurants.length == 0){
        return <Shimmer/>
    }
    return (
        <div className="body">
            <div className="filter flex justify-between">
                <div className="m-2 p-2 flex">
                    <button 
                        className="filter-btn px-2 bg-blue-200 border border-gray-600 rounded-md"
                        onClick={() => {
                            setFilteredRestaurant(
                                listOfRestaurants.filter(res => res.info.avgRating > 4.3
                            ));
                            // console.log(listOfRestaurants);
                        }}
                    >
                    Top Rated Restaurants
                    </button>
                </div>
                <div className="search m-2 p-2 flex">
                    <label className="px-4 mr-4 bg-blue-200 border border-gray-600 rounded-md">username: </label>
                    <input 
                            data-testid="UserNameInput"
                            type="text" 
                            className="search-box border-2
                            border-black rounded pl-2"
                            value={loggedInUser}
                            onChange={(e) => setUserName(e.target.value)}
                        >
                    </input>
                </div>
                <div className="search m-2 p-2 flex">
                    <input 
                            data-testid="SearchInput"
                            type="text" 
                            className="search-box border-2
                            border-black rounded pl-2"
                            value={searchText} 
                            placeholder="Search here"
                            onChange={(e) => {setSearchText(e.target.value)}}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const searchedRestaurants = listOfRestaurants.filter((res) => 
                                        res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                    setFilteredRestaurant(searchedRestaurants);
                                }
                            }}> 
                    </input>
                    <button className="px-4 ml-4 bg-blue-200 border border-gray-600 rounded-md"
                    onClick={() => {
                        const searchedRestaurants = listOfRestaurants.filter((res) => 
                            res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(searchedRestaurants);
                        // console.log(searchedRestaurants);
                        // console.log(searchText);
                    }}>
                        {SEARCH_ICON} Search
                    </button>
                </div>
            </div>

            <div className="restaurantContainer flex flex-wrap ml-custom-left mr-custom-right">
                {
                    filteredRestaurant.map(restaurant => (
                        <Link className="cursor-default"
                                key={restaurant.info.id} 
                                to={"/restaurants/" + restaurant.info.id}>
                                    {/* {(restaurant.info.avgRating > 4.3)? <RestaurantCardTopRated resData = {restaurant}/> : <RestaurantCard resData ={restaurant}/>} */}
                                <RestaurantCard resData ={restaurant}/>
                        </Link>
                    ))
                }                
            </div>
        </div>
    );
}

export default Body;
