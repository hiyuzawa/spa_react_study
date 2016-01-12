import React, { Component } from 'react';

export default class Sample_ES2015 extends Component {
    constructor() {
        super();
        this.state = {counter: 0};
        this.clickCounter = this.clickCounter.bind(this);
    }

    clickCounter() {
        this.setState({counter: this.state.counter + 1});
    }

    render() {
        return (
            <div className="sample_es2015">
                <p>Hello!! from Sample_ES2015 Component!! {this.props.date} by {this.props.name}</p>
                <input type="button" onClick={this.clickCounter} value="count up!" />
                <p>count: {this.state.counter}</p>
            </div>
        );
    }
}