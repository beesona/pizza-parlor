import { PizzaOrderSubject } from "./observables/order-subject";
import { PizzaOrderObserver } from "./observables/order-observer";
import { ServiceFactory, ClientType } from "./services/order-services";

// client code:

// here are our observers. We can extend this with more observers as
// our app evolves.
const observers = [ClientType.customer, ClientType.doorDash];

// create the subject (We are creating a new pizza order!).
const pizzaOrderStatusPublisher = new PizzaOrderSubject();

// create the observers.
observers.forEach((observer) => {
  new PizzaOrderObserver(
    `Observer ${observer}`,
    pizzaOrderStatusPublisher,
    ServiceFactory.createService(observer)
  );
});

// change the state of the subject.
pizzaOrderStatusPublisher.orderStatus = "Prepared";

// do it again!
pizzaOrderStatusPublisher.orderStatus = "Delivered";
