import { expect } from 'chai';
import { PizzaOrderSubject } from '../../src/observables/order-subject';
import { PizzaOrderObserver } from '../../src/observables/order-observer';
import { ServiceFactory, ClientType } from '../../src/services/order-services';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
const chai = require('chai');
chai.use(sinonChai);

describe('Order Subject- Register Observer', () => {
  it('should add a new observer to the observers collection', () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      'test observer',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    expect(subject).to.have.property('observers').with.length(1);
  });
});

describe('Order Subject- Remove Observer', () => {
  it('should remove the observer- single observer registered', () => {
    const subject = new PizzaOrderSubject();
    const observer = new PizzaOrderObserver(
      'test observer',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    expect(subject).to.have.property('observers').with.length(1);
    subject.removeObserver(observer);
    expect(subject).to.have.property('observers').with.length(0);
  });

  it('should remove an observer- multiple observers registered', () => {
    const subject = new PizzaOrderSubject();
    const observerOne = new PizzaOrderObserver(
      'test observer 1',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    const observerTwo = new PizzaOrderObserver(
      'test observer 2',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    expect(subject).to.have.property('observers').with.length(2);
    subject.removeObserver(observerOne);
    expect(subject)
      .to.have.property('observers')
      .with.length(1)
      .and.to.not.include(observerOne);
  });

  it('should not remove an observer- observer not registered', () => {
    const subject = new PizzaOrderSubject();
    const observerOne = new PizzaOrderObserver(
      'test observer 1',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    const observerTwo = new PizzaOrderObserver(
      'test observer 2',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    expect(subject).to.have.property('observers').with.length(2);
    subject.removeObserver(observerOne);
    expect(subject)
      .to.have.property('observers')
      .with.length(1)
      .and.to.not.include(observerOne);
    subject.removeObserver(observerOne);
    expect(subject)
      .to.have.property('observers')
      .with.length(1)
      .and.to.not.include(observerOne);
  });
});

describe('Order Subject- Set Order Status', () => {
  it('should set the order status to Prepared, and not have a delivery date.', () => {
    const subject = new PizzaOrderSubject();
    subject.orderStatus = 'Prepared';
    expect(subject)
      .to.have.property('pizzaState')
      .and.to.have.property('status', 'Prepared');
    expect(subject)
      .to.have.property('pizzaState')
      .and.to.have.property('deliveryDate').and.to.be.undefined;
  });
  it('should set the order status to Delivered, and include a new delivery date.', () => {
    const subject = new PizzaOrderSubject();
    subject.orderStatus = 'Delivered';
    expect(subject)
      .to.have.property('pizzaState')
      .and.to.have.property('status', 'Delivered');
    expect(subject)
      .to.have.property('pizzaState')
      .and.to.have.property('deliveryDate').and.to.not.be.undefined;
  });
});

describe('Order Subject- Notify Observers', () => {
  it('should notify every observer registered in the registry', () => {
    const subject = new PizzaOrderSubject();
    const observerOne = new PizzaOrderObserver(
      'test observer 1',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    const observerTwo = new PizzaOrderObserver(
      'test observer 2',
      subject,
      ServiceFactory.createService(ClientType.doorDash)
    );
    Sinon.spy(observerOne, 'update');
    Sinon.spy(observerTwo, 'update');
    subject.orderStatus = 'Prepared';
    expect(observerOne.update).to.have.been.calledOnce;
    expect(observerTwo.update).to.have.been.calledOnce;
  });
});
