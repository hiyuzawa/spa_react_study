var React = require("react");
var ReactDOM = require("react-dom");

var Sample = React.createClass({
    handleNameButtonClick: function() {
        this.props.chageName(ReactDOM.findDOMNode(this.refs.name_text).value);
    },
    render() {
        return (
            <div className="sample">
                <p>Hello!! from Sample Component!! {this.props.date} by {this.props.name}</p>
                <input type="text" ref="name_text" />
                <input type="button" onClick={this.handleNameButtonClick} value="chage me" />
            </div>
            );
    }
});

module.exports = Sample;