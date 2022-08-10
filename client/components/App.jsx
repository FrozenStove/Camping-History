import React, { Component } from "react";
import HistoryCard from "./historyCard.jsx"
import GisMap from "./GisMap.jsx";


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAction: 'POST',
            history: [],
            selected: 0,
        }
        this.createClick = this.createClick.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.selectClick = this.selectClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
    }
    handleClick() {
        const postBody = {
            "siteName": document.getElementById('site-input').value,
            "visitDate": document.getElementById('date-input').value,
            "username": document.getElementById('name-input').value,
            "comment": document.getElementById('comment-input').value
        }
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
                "_id": id
            })
        }
        console.log(delOptions);
        fetch('/deletevisit', delOptions)
            .then(resp => resp.json())
            .then((data) => {
                this.setState({ history: data })
            })
            .catch((error) => console.log(error))
    }

    getHistory() {
        const getOptions = {
            method: 'GET'
        }
        fetch('/getvisit', getOptions)
            .then(resp => resp.json())
            .then((data) => {
                // console.log(data);
                this.setState({ history: data })
                // console.log(this.state.history)
                // this.state.history.push(data);
            })
            .catch((error) => console.log(error))

    }
    componentDidMount() {
        // console.log(this.state.history)
        // console.log('comdidmount')
        this.getHistory();
        // console.log(this.state.history)

    }
    render() {
        const hist = [];
        for (let i = 0; i < this.state.history.length; i++) {
            // console.log('i', i)
            hist.push(<HistoryCard history={this.state.history[i]} deleteClick={this.deleteClick} selectClick={this.selectClick} key={this.state.history[i]._id + 100} i={i}></HistoryCard>)
        }
        let currentSelection;
        if (this.state.updateId) {
            currentSelection = (<HistoryCard history={this.state.history[this.state.selected]} deleteClick={this.deleteClick} selectClick={this.selectClick} key={0}></HistoryCard>)
        } else {
            currentSelection = <p> Click an Entry Below to Update!</p>
        }
        return (
            <>
                <div id="top-half">
                    <GisMap></GisMap>
                    <div id="side-bar">
                        <h2>Add a New Visit Here!</h2>
                        <form id="the-form"
                            onSubmit={() => {
                                this.handleClick();
                                event.preventDefault();
                            }}>
                            <input type="text" required id="site-input" placeholder="Site Name"></input>
                            <input type="date" required id="date-input" placeholder="Date"></input>
                            <input type="text" required id="comment-input" placeholder="Comments"></input>
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