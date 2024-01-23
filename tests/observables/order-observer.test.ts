import { expect } from "chai";
import { PizzaOrderSubject } from "../../src/observables/order-subject";
import { PizzaOrderObserver } from "../../src/observables/order-observer";
import { ServiceFactory, ClientType } from "../../src/services/order-services";
import Sinon from "sinon";
import sinonChai from "sinon-chai";
var chai = require("chai");
chai.use(sinonChai);

describe("Order Subject- Register Observer", () => {
  it("should add a new observer to the observers collection", () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      "test observer",
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    expect(subject).to.have.property("observers").with.length(1);
  });

  it("should send the order to the service", () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      "test observer",
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    const sendOrderSpy = Sinon.spy(observer.orderService, "sendOrder");
    subject.orderStatus = "Prepared";
    expect(sendOrderSpy).to.have.been.calledOnce;
  });
});
