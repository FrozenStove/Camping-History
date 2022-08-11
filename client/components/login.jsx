import React, { Component } from "react";

class loginForm extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            // <form method="POST" action='/account/login'>
            <form onSubmit={this.props.loginClick}>
                <input id="login-username" name="username" type="text" placeholder="username"></input>
                <input id="login-password" name="password" type="password" placeholder="password"></input>
                <input type='submit' value="login"></input>
            </form>
        )
    }
}

{/* <a href='./signup'>Sign up</a> */ }
export default loginForm;