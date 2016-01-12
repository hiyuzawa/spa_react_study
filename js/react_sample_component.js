var React = require("react");

var Sample = React.createClass({
    handleNameButtonClick: function() {
        this.props.chageName("Hideto Yuzawa");
    },
    render() {
        return (
            <div className="sample">
                <p>Hello!! from Sample Component!! {this.props.date} by {this.props.name}</p>
                <input type="button" onClick={this.handleNameButtonClick} value="chage me" />
            </div>
            );
    }
});

module.exports = Sample;