import { useState, useContext} from "react";
import {LOGO_URL} from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { ABOUT_US_ICON, HOME_ICON, CART_ICON, CONTACT_US_ICON } from "../utils/constants";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () =>{
    const [btnName, setBtnName] = useState("Login");
    // console.log(btnName);

    const onlineStatus = useOnlineStatus();

    const dummy = useContext(UserContext);

    //subscribing to the store using a selector
    const cartItems = useSelector((store) => store.cart.items);
    // console.log(cartItems);

    return (
            <div className="flex justify-between m-2 shadow-lg bg-blue-100">
                <div className="logo-container">
                    <img className="w-[150px]" src={LOGO_URL}/>
                </div>
                <div className="flex items-center">
                    <ul className="flex p-4 m-4">
                        <li className="px-4 m-1">{(onlineStatus)? "Online: 🟢" : "Offline: 🔴"}</li>
                        <li className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md"><Link to="/">Home {HOME_ICON}</Link></li>
                        <li className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md"><Link to="/about">About {ABOUT_US_ICON}</Link></li>
                        <li className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md"><Link to="/contact">Contact {CONTACT_US_ICON}</Link></li>
                        {/* <Link to="/grocery"><li className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md">Grocery</li></Link> */}
                        <li className="px-4 
                            m-1 border-2 border-gray-600
                             bg-blue-200 rounded-md font-bold"
                            >
                                <Link to="/cart">Cart({cartItems.length})</Link>
                        </li>
                        <button className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md" 
                                onClick={() => {
                                    btnName == "Login" ? setBtnName("Logout") : setBtnName("Login");
                                }}
                        >
                            {btnName}
                        </button>
                        <li className="px-4 m-1 border-2 border-gray-600  bg-blue-200 rounded-md">{dummy.loggedInUser}</li>
                    </ul>
                </div>
            </div>
    );
}

export default Header;