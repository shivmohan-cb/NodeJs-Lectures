const Event = require("events");

class Order extends Event {
    ordreNO;
    orders;
    constructor(){
        super();//  for inheritance , inheriting properties of Event;
        this.ordreNO=0;
        this.orders=[];
    }
    getAllOrders(){
        return this.orders;

    }
    reciveOrder(orderName,orderType){
        this.ordreNO++;
        this.emit("order-recieved",orderName,orderType);
        console.log("Current order no : "+this.ordreNO);

    }

}

module.exports = Order;