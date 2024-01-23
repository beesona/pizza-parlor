import { PizzaFactory } from "../pizza/pizza-factory";
import {
  IPizzaOrder,
  IPizzaOrderObserver,
  IPizzaOrderSubject,
} from "../types/pizza";

// concrete implementation of the subject.
class PizzaOrderSubject implements IPizzaOrderSubject {
  private observers: IPizzaOrderObserver[] = [];
  private pizzaState: IPizzaOrder = {
    pizza: PizzaFactory.createPizza("DeepDish", ["cheese", "pepperoni"]),
    orderDate: new Date(),
    status: "Ordered",
  };

  set orderStatus(status: "Ordered" | "Prepared" | "Delivered") {
    this.pizzaState.status = status;
    this.pizzaState.deliveryDate =
      status === "Delivered" ? new Date() : undefined;
    this.notifyObservers(this.pizzaState);
  }

  registerObserver(observer: IPizzaOrderObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IPizzaOrderObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex > -1) {
      this.observers.splice(observerIndex, 1);
    }
  }

  notifyObservers(order: IPizzaOrder): void {
    this.observers.forEach((observer: IPizzaOrderObserver) =>
      observer.update(order)
    );
  }
}

export { PizzaOrderSubject };
