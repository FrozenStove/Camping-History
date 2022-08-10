import React, { Component } from "react";
import HistoryCard from "./historyCard.jsx"


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAction: 'POST',
            history: [],
        }
        this.createClick = this.createClick.bind(this);
        this.updateClick = this.updateClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
    }
    handleClick() {
        const postOptions = {
            method: this.state.formAction,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "siteName": document.getElementById('site-input').value,
                "visitDate": document.getElementById('date-input').value,
                "username": document.getElementById('name-input').value,
                "comment": document.getElementById('comment-input').value
            })
        }
        // console.log(postOptions);
        fetch('/addvisit', postOptions)
            .then((data) => console.log(data))
            .catch((error) => console.log(error))

    }

    createClick() {
        this.state.formAction = 'POST';
        console.log('Post!');
    }

    updateClick() {
        this.state.formAction = 'PATCH';
        console.log('Patch!');
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
            hist.push(<HistoryCard history={this.state.history[i]} deleteClick={this.deleteClick} key={this.state.history[i]._id}></HistoryCard>)
        }
        return (
            <>
                <div id="top-half">
                    <div id="map">
                        <p>temporary ahaha text</p>
                    </div>
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