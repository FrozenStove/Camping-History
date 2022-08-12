import React, { Component } from "react";
import HistoryCard from "./historyCard.jsx"
import GisMap from "./GisMap.jsx";
import LoginForm from "./login.jsx"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAction: 'POST',
            history: [],
            selected: 0,
            username: {username: undefined, user_id: undefined}
        }
        this.createClick = this.createClick.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.selectClick = this.selectClick.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.signupClick = this.signupClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
        this.loginClick = this.loginClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
    }
    handleClick() {
        const postBody = {
            "siteName": document.getElementById('site-input').value,
            "visitDate": document.getElementById('date-input').value,
            "username": document.getElementById('name-input').value,
            "comment": document.getElementById('comment-input').value,
            // "user_id": this.state.username.user_id 
        }
        if (this.state.username){
            postBody.user_id = this.state.username.user_id;
        }
        console.log('currentstate: ', this.state)
        if (this.state.formAction === 'PATCH') {
            postBody._id = this.state.updateId;
        }
        console.log(postBody)
        const postOptions = {
            method: this.state.formAction,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        }
        // console.log(postOptions);
        fetch('/addvisit', postOptions)
            .then(resp => resp.json())
            .then((data) => {
                // create a popup or alert if status code is 204
                this.setState({ history: data })
            })
            .catch((error) => console.log(error))

    }

    createClick() {
        this.setState({ formAction: 'POST' });
        console.log('Post!');
    }

    updateClick() {
        this.setState({ formAction: 'PATCH' });
        // this.state.formAction = 'PATCH';
        console.log('Patch!');
    }

    selectClick(i, _id) {
        this.setState({ selected: i, updateId: _id })
    }

    clearClick() {
        this.setState({ selected: undefined, updateId: undefined })
    }

    deleteClick(id) {
        console.log('Delete!', id);
        const delOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "_id": id,
                "user_id": this.state.username ? this.state.username.user_id : undefined
            })
        }
        console.log(delOptions);
        fetch('/deletevisit', delOptions)
            .then(resp => resp.json())
            .then((data) => {
                this.setState({ history: data , selected: undefined, updateId: undefined })
            })
            .catch((error) => console.log(error))
    }

    getHistory() {
        const getBody = {
            "user_id": this.state.username.user_id 
        }
        // need to make this a post because chrome wont let us get with a body
        const getOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(getBody)
        }
        fetch('/getvisit', getOptions)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data);
                this.setState({ history: data.data, username: data.username })
                // console.log(this.state.history)
                // this.state.history.push(data);
            })
            .catch((error) => console.log(error))

    }

    getUsername(){
        const getOptions = {
            method: 'GET'
        }
        fetch('/account/', getOptions)
            .then(resp => resp.json())
            .then((data) => {
                // console.log(data);
                this.setState({ history: data })
                // console.log(this.state.history)
                // this.state.history.push(data);
            })
            .catch((error) => console.log(error))

    }

    loginClick(){
        const postBody = {
            "username": document.getElementById('login-username').value,
            "password": document.getElementById('login-password').value
        }

        console.log('login postbody',postBody)
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
            credentials: 'include'
        }
        console.log('login post option', postOptions);
        fetch('/account/login', postOptions)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data)
                // create a popup or alert if status code is 204
                this.setState({ username: data })
            })
            .then(() => {
                this.getHistory()
            })
            .catch((error) => console.log(error))
    }
    
    logoutClick(){
        const delOptions = {
            method: 'DELETE'
        }
        // console.log('login post option', postOptions);
        fetch('/account/logout', delOptions)
            .then((data) => {
                console.log('logout text', data)
                this.setState({username: {username: undefined, user_id: undefined}})
                this.getHistory()
            })
            .catch((error) => console.log(error))

        }

        signupClick(){
            const postBody = {
                "username": document.getElementById('login-username').value,
                "password": document.getElementById('login-password').value
            }
    
            console.log('login postbody',postBody)
            const postOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postBody),
                credentials: 'include'
            }
            console.log('login post option', postOptions);
            fetch('/account/signup', postOptions)
                .then(resp => resp.json())
                .then((data) => {
                    console.log(data)
                    // create a popup or alert if status code is 204
                    this.setState({ username: data })
                })
                .then(() => {
                    this.getHistory()
                })
                .catch((error) => console.log(error))
        }

    componentDidMount() {
        // console.log(this.state.history)
        // console.log('comdidmount')
        this.getHistory();
        // this.getUsername();
        // console.log(this.state.history)

    }
    render() {
        const hist = [];
        for (let i = 0; i < this.state.history.length; i++) {
            // console.log('i', i)
            hist.push(<HistoryCard history={this.state.history[i]} deleteClick={this.deleteClick} selectClick={this.selectClick} key={this.state.history[i]._id + 100} i={i}></HistoryCard>)
        }
        let currentSelection;
        console.log('newest test situation',this.state.history, this.state.selected)
        console.log('updateid', this.state.updateId)
        if (this.state.updateId && this.state.history[this.state.selected]) {
            console.log('the selected history data', this.state.history[this.state.selected])
            currentSelection = (<HistoryCard history={this.state.history[this.state.selected]} deleteClick={this.deleteClick} selectClick={this.selectClick} key={0}></HistoryCard>)
        } else {
            currentSelection = <p> Click an Entry Below to Update!</p>
        }
        let username;
        if (this.state.username) {
            username = [`Welcome ${this.state.username.username}!`,<><br></br><button onClick={this.logoutClick}>Logout</button></>]
        } else {
            username = <><LoginForm loginClick={this.loginClick} signupClick={this.signupClick} key={1}></LoginForm></>
        }

        return (
            <>
                <div id="nav-bar">
                <h1>Camping History</h1>
                <h3>{username}</h3>
                <button><img src="../assets/google.jpg"></img> Sign in with Google (WIP)</button>
                </div>
                <div id="top-half">
                    <GisMap key={2}></GisMap>
                    <div id="side-bar">
                        <h2>Add a New Visit Here!</h2>
                        <form id="the-form"
                            onSubmit={() => {
                                this.handleClick();
                                event.preventDefault();
                            }}>
                            <input type="text" required id="site-input" placeholder="Site Name"></input>
                            <input type="date" required id="date-input" placeholder="Date"></input>
                            <textarea type="text" required id="comment-input" placeholder="Comments"></textarea>
                            <input type="text" required id="name-input" placeholder="Name"></input>
                            <input type="submit" onClick={this.createClick} value="New Entry"></input>
                            <input type="submit" onClick={this.updateClick} value="Update Entry"></input>
                        </form>
                        <div id="selected">
                            {currentSelection}
                        </div>
                        <button id="clear-button" onClick={this.clearClick} >Clear Selection</button>
                    </div>
                </div>
                <div id="history">
                    {hist}
                </div>
            </>
        )
    }
}
export default App;