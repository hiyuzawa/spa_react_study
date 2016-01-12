import React, { Component } from 'react';

export default class Sample_ES2015 extends Component {
    render() {
        return (
            <div className="sample_es2015">
                <p>Hello!! from Sample_ES2015 Component!! {this.props.date} by {this.props.name}</p>
            </div>
        );
    }
}