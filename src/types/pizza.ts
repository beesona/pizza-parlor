interface IPizza {
  toppings: string[];
  preparePizza(name: string, includeDate?: boolean): void;
}

interface IDeepDishPizza extends IPizza {
  doughType: "Seminole" | "Wheat";
}

interface ITavernPizza extends IPizza {
  squareCutSize: "Small" | "Medium" | "Large";
}

interface IPizzaOrder {
  pizza: IPizza;
  orderDate: Date;
  deliveryDate?: Date;
  status: "Ordered" | "Prepared" | "Delivered";
}

interface IPizzaOrderObserver {
  name: string;
  update(order: IPizzaOrder): void;
}

interface IPizzaOrderSubject {
  registerObserver(observer: IPizzaOrderObserver): void;
  removeObserver(observer: IPizzaOrderObserver): void;
  notifyObservers(order: IPizzaOrder): void;
}

interface IOrderServiceAdapter {
  sendOrder(order: IPizzaOrder): void;
}

interface IDoorDashOrder {
  item: any;
  orderDate: Date;
  pickupLocation: string;
}

interface ICustomerClientOrder extends IPizzaOrder {
  customerLocation: string;
}

export {
  IPizza,
  IDeepDishPizza,
  ITavernPizza,
  IPizzaOrder,
  IPizzaOrderObserver,
  IPizzaOrderSubject,
  IOrderServiceAdapter,
  IDoorDashOrder,
  ICustomerClientOrder,
};
