import React, { Component } from 'react';


export default class Textarea extends Component {
    render() {
        const { name, value, onChange, label } = this.props;
        return (
            <div>
                <label htmlFor="new-email">{label}</label>
                <textarea onChange={onChange} name={name} value={value}></textarea>
            </div>
        );
    }
}