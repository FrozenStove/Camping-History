import React, { Component } from "react";

class HistoryCard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { _id, site_name, visit_date, comment, username } = this.props.history;
        // console.log('hiscards', this.props)
        // const deleteClick = this.props.deleteClick;
        // console.log('histcard', _id)
        return (
            <div className="history-card" id={_id} onClick={() => this.props.selectClick(this.props.i, _id)}>
                <p label="Camp Site">Camp Site: {site_name}</p>
                <p label="Date">Date: {visit_date}</p>
                <p label="Comments">Comments: {comment}</p>
                <p label="Username" >Name: {username}</p>
                <button className='deleteVisit' onClick={() => this.props.deleteClick(_id)}>Delete</button>
            </div>
        )
    }
}


export default HistoryCard;