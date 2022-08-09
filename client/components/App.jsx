import React, { Component } from "react";


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formAction: 'POST',
        }
        this.createClick = this.createClick.bind(this);
        this.updateClick = this.updateClick.bind(this);
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
        console.log(postOptions);
        fetch('/addvisit', postOptions)
            .then((data) => console.log(data))
            .catch((error) => console.log(error))

    }

    createClick() {
        this.state.formAction = 'POST';
        console.log('Post!')
    }

    updateClick() {
        this.state.formAction = 'PATCH';
        console.log('Patch!')
    }

    

    render() {

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
                    
                </div>
            </>
        )
    }
}



export default App;