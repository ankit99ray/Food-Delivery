import React from "react";

class UserClass2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            count: 0,
            count2: 2
        }
        console.log(this.props.name + " child constructor userclass 2");
    }

    componentDidMount(){
        console.log(this.props.name + " child component did mount userclass 2");
    }

    render() {
        console.log(this.props.name + " child render userclass 2");
        return (
            <div className="user-card">
                <h2>Count= {this.state.count}</h2>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1,
                    });
                }}>Count Increase</button>
                <h2>Name: {this.props.name}</h2>
                <h3>Location: Maharashtra</h3>
                <h4>email: ankit@gmail.com</h4>
            </div>
        )
    }
}

export default UserClass2;