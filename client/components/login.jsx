import React, { Component } from "react";

class loginForm extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            // <form method="POST" action='/account/login'>
            <form
                onSubmit={() => {
                    this.props.loginClick();
                    event.preventDefault();
                }}>
                <input id="login-username" type="text" placeholder="Username"></input>
                <input id="login-password" type="password" placeholder="Password"></input>
                <input type='submit' value="Login"></input>
            </form>
        )
    }
}

{/* <a href='./signup'>Sign up</a> */ }
export default loginForm;