import React, {Component} from 'react';

export default class Review extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article>
                <header>{this.props.user} - {this.props.rating}</header>
                <p>{this.props.comment}</p>
                <footer>posted on: {this.props.date}</footer>
            </article>
        )
    }
}