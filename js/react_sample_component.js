var React = require("react");

var Sample = React.createClass({
    render() {
        return (
            <div className="sample">
                <p>Hello!! from Sample Component!! {this.props.date} by {this.props.name}</p>
            </div>
            );
    }
});

module.exports = Sample;