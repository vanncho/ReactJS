import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementAction, decrementAction, clearAction } from './../actions/actions';

class Counter extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <h1>{this.props.count}</h1>
                <button onClick={() => this.props.increment()}>+</button>
                <button onClick={() => this.props.decrement()}>-</button>
                <button onClick={() => this.props.clear()}>clear</button>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }; 
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(incrementAction()),
        decrement: () => dispatch(decrementAction()),
        clear: () => dispatch(clearAction())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);