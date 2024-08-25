import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";
import { useContext } from "react";

// class About extends React.Component {
//     constructor(props){
//         super(props);
//         console.log("Parent Constructor");
//     }

//     componentDidMount(){
//         console.log("Parent component did mount");
//     }

//     render(){
//         console.log("Parent render");
//         return (
//             <div>
//                 <h1>This is about us page</h1>
//                 <UserClass name={"1st"}/>
//                 <UserClass name={"2nd"}/>
//                 <UserClass name={"3rd"}/>
//             </div>
//         );
//     }
// }

const About = () => {

    const dummy = useContext(UserContext);

    return (
        <div className="text-center">
            <h1 className="m-4 p-4 text-3xl font-extrabold">This is about us page</h1>
            <User name={dummy.loggedInUser}/>
        </div>
    );
}

export default About;