var _ = require("lodash");
var my_module1 = require("./my_module1.js");
// var my_add = require("./my_module1.js").add

console.log("hello node cli world!");

var array = [1,3,5,7,9];
_.each(array, function(element, index, array) {
    console.log(index + ":" + element + ":" + my_module1.add(element,index));
});

