import React, { Component } from "react";

class HistoryCard extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const dateOptions = {
            timeStyle: "short"
        
          }
        const { _id, site_name, visit_date, comment, username } = this.props.history;
        const cleanDate = new Date(visit_date).toLocaleDateString('en-us')
        return (
            <div className="history-card" id={_id} onClick={() => this.props.selectClick(this.props.i, _id)}>
                <p label="Camp Site">Camp Site: {site_name}</p>
                <p label="Date">Date: {cleanDate}</p>
                <p label="Comments">Comments: {comment}</p>
                <p label="Username" >Name: {username}</p>
                <button className='deleteVisit' onClick={() => this.props.deleteClick(_id)}>Delete</button>
            </div>
        )
    }
}


export default HistoryCard;