import React, { Component } from "react";

class loginForm extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        return (
            <form method="POST" action='/account/login'>
                <input name="username" type="text" placeholder="username"></input>
                <input name="password" type="password" placeholder="password"></input>
                <input type='submit' value="login"></input>
            </form>
        )
    }
}

{/* <a href='./signup'>Sign up</a> */ }
export default loginForm;