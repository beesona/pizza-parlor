import { PizzaOrderSubject } from "./observables/order-subject";
import { PizzaOrderObserver } from "./observables/order-observer";
import { ServiceFactory, ClientType } from "./services/order-services";

// client code:

// here are our observers. We can extend this with more observers as
// our app evolves.
const observers = [
  { name: "Customer Adam", type: ClientType.customer },
  { name: "DoorDash", type: ClientType.doorDash },
];

// create the subject (We are creating a new pizza order!).
const pizzaOrderStatusPublisher = new PizzaOrderSubject();

// create the observers.
observers.forEach((observer) => {
  new PizzaOrderObserver(
    `Observer ${observer.name}`,
    pizzaOrderStatusPublisher,
    ServiceFactory.createService(observer.type)
  );
});

// change the state of the subject.
pizzaOrderStatusPublisher.orderStatus = "Prepared";

// do it again!
pizzaOrderStatusPublisher.orderStatus = "Delivered";
