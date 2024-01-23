import { expect } from 'chai';
import { PizzaOrderSubject } from '../../src/observables/order-subject';
import { PizzaOrderObserver } from '../../src/observables/order-observer';
import { ServiceFactory, ClientType } from '../../src/services/order-services';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
const chai = require('chai');
chai.use(sinonChai);

describe('ServiceFactory- createService', () => {
  it('should create a new DoorDashServiceProvider', () => {
    const service = ServiceFactory.createService(ClientType.doorDash);
    expect(service).to.have.property('mockDoorDashApiClient');
  });
  it('should create a new CustomerClientServiceProvider', () => {
    const service = ServiceFactory.createService(ClientType.customer);
    expect(service).to.have.property('mockCustomerClientApi');
  });
});

describe('CusomerClientServiceProvider- sendOrder', () => {
  it('should send the order to the customer client', () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      'test observer',
      subject,
      ServiceFactory.createService(ClientType.customer)
    );
    const sendOrderSpy = Sinon.spy(observer.orderService, 'sendOrder');
    subject.orderStatus = 'Prepared';
    expect(sendOrderSpy).to.have.been.calledOnce;
  });
});

describe('DoorDashServiceProvider- sendOrder', () => {
  it('should send the order to the door dash client', () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      'test observer',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    const sendOrderSpy = Sinon.spy(observer.orderService, 'sendOrder');
    subject.orderStatus = 'Prepared';
    expect(sendOrderSpy).to.have.been.calledOnce;
  });
});
