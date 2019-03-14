var message = "in global";
console.log("global: message = " + message);
var a = function (){
  var message = "inside a";
  console.log("a: message = " + message);
  b();
}
a();

function b(){
  console.log("b: message = " + message);
}
