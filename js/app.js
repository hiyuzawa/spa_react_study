var _ = require("lodash");
var my_module1 = require("./my_module1.js");
var React = require('react');
var ReactDOM = require('react-dom');
var Sample = require('./react_sample_component');

import MyModule2 from './my_module2';
import Sample_ES2015 from './react_sample_component_es2015'

import AppBar from 'material-ui/lib/app-bar';

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

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

        getInitialState: function() {
            return {
                name: "hiyuzawa",
                date: "2016-01-12"
            };
        },

        changeName: function(new_name) {
            this.setState({name: new_name});
        },

        menuLeftIconTapped: function(e) {
            console.log("menu left button clicked!!");
        },

        render: function() {
            return (
                <div className="Hello">
                    <AppBar
                        title="spa_react_study"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonTouchTap={this.menuLeftIconTapped}
                    />
                    Hello React World!! by {this.state.name}
                    <Sample
                        name={this.state.name}
                        date={this.state.date}
                        chageName={this.changeName}
                        />

                    <Sample_ES2015
                        name={this.state.name}
                        date={this.state.date}
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

