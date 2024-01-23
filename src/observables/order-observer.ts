import {
  IOrderServiceAdapter,
  IPizzaOrder,
  IPizzaOrderObserver,
  IPizzaOrderSubject,
} from '../types/pizza';

// concrete implementation of the observer.
class PizzaOrderObserver implements IPizzaOrderObserver {
  orderService: IOrderServiceAdapter;

  constructor(
    public name: string,
    private subject: IPizzaOrderSubject,
    orderService: IOrderServiceAdapter
  ) {
    this.subject.registerObserver(this);
    this.orderService = orderService;
  }

  update(order: IPizzaOrder): void {
    console.log(`Order updated detected ${this.name}`);
    this.orderService.sendOrder(order);
  }
}

export { PizzaOrderObserver };
