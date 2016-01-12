var _ = require("lodash");
var my_module1 = require("./my_module1.js");
var React = require('react');
var ReactDOM = require('react-dom');
var Sample = require('./react_sample_component');

import MyModule2 from './my_module2';
import Sample_ES2015 from './react_sample_component_es2015'


$(function(){
    console.log("Hello from javascript");
    $("#title").text("Hello from jquery");

    var array = [1,3,5,7,9];
    _.each(array, function(element, index, array) {
        console.log(index + ":" + element + ":" + my_module1.add(element,index));
    });

    const my_module2 = new MyModule2("hiyuzawa");
    console.log(my_module2.sayHello());

    var Hello = React.createClass({
        render: function() {
            return (
                <div className="Hello">
                    Hello React World!! by {this.props.name}
                    <Sample
                        name={this.props.name}
                        date="2016-01-12"
                        />

                    <Sample_ES2015
                        name={this.props.name}
                        date="2016-01-12"
                        />
                </div>
            );
        }
    })

    ReactDOM.render(
        <Hello name="hiyuzawa"/>,
        document.getElementById('content')
    );
})

