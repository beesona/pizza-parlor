import {
  ICustomerClientOrder,
  IDoorDashOrder,
  IOrderServiceAdapter,
  IPizzaOrder,
} from "../types/pizza";

class DoorDashServiceProvider implements IOrderServiceAdapter {
  mockDoorDashApiClient = {
    getPickupLocation: (): string => "123 Fake St. Denver CO 80205",
  };

  sendOrder(order: IPizzaOrder): void {
    const newOrder: IDoorDashOrder = {
      item: order.pizza,
      orderDate: order.orderDate,
      pickupLocation: this.mockDoorDashApiClient.getPickupLocation(),
    };
    console.log(`Order sent to provider client:`);
    console.log(newOrder);
  }
}

class CustomerClientServiceProvider implements IOrderServiceAdapter {
  mockCustomerClientApi = {
    getCustomerLocation: (): string => "2350 Tremont Pl Denver CO 80205",
  };

  sendOrder(order: IPizzaOrder): void {
    const newOrder: ICustomerClientOrder = {
      ...order,
      customerLocation: this.mockCustomerClientApi.getCustomerLocation(),
    };
    console.log(`Order sent to customer client:`);
    console.log(newOrder);
  }
}

enum ClientType {
  customer,
  doorDash,
}

class ServiceFactory {
  static createService(type: ClientType): IOrderServiceAdapter {
    switch (type) {
      case ClientType.doorDash:
        return new DoorDashServiceProvider();
      case ClientType.customer:
        return new CustomerClientServiceProvider();
      default:
        throw new Error("Invalid client type...");
    }
  }
}

export { ServiceFactory, ClientType };
