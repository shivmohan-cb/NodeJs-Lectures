// const Event = require("events");
// let EventEmitter = new Event();
// function callFunc(name,no){
//     console.log(name+" Function called using EventEmiter "+no);
// }
// function fun2(){
//     console.log("Function 2");
// }
// EventEmitter.on("callFunc", callFunc);
// EventEmitter.on("second-function",fun2);

// EventEmitter.emit("callFunc");

// function driving(){
//     console.log("I am driving");
// }
// EventEmitter.on("drive",driving);
// EventEmitter.emit("drive");

const Order = require("./Orders.js");

let order = new Order();

function orderRecieved(orderName,orderType) {
 console.log(orderName+ " has ordered something, with order type "+ orderType)
}
console.log(order.on("order-recieved", orderRecieved));

order.reciveOrder("Shiv","Cash on delivery");

