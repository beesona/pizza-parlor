import { expect } from "chai";
import Sinon from "sinon";
import sinonChai from "sinon-chai";
import { PizzaFactory } from "../../src/pizza/pizza-factory";
var chai = require("chai");
chai.use(sinonChai);

describe("Pizza-Factory- Create Pizza", () => {
  it("should create a DeepDish pizza with the correct toppings", () => {
    const pizza = PizzaFactory.createPizza("DeepDish", ["cheese", "pepperoni"]);
    expect(pizza).to.have.property("toppings").with.length(2);
    expect(pizza.toppings).to.include("cheese");
    expect(pizza.toppings).to.include("pepperoni");
  });
  it("should create a Tavern pizza with the correct toppings", () => {
    const pizza = PizzaFactory.createPizza("Tavern", ["cheese", "pepperoni"]);
    expect(pizza).to.have.property("toppings").with.length(2);
    expect(pizza.toppings).to.include("cheese");
    expect(pizza.toppings).to.include("pepperoni");
  });
});

// lame test for stub methods.
describe("PizzaFactory- Created Pizza Send Order", () => {
  it("should call the send function for a created Taven pizza type", () => {
    const pizza = PizzaFactory.createPizza("Tavern", ["cheese", "pepperoni"]);

    Sinon.spy(pizza, "preparePizza");

    pizza.preparePizza("Tavern Pizza", true);

    expect(pizza.preparePizza).to.have.been.calledOnce;
  });

  it("should call the send function for a created DeepDish pizza type", () => {
    const pizza = PizzaFactory.createPizza("DeepDish", ["cheese", "pepperoni"]);

    Sinon.spy(pizza, "preparePizza");

    pizza.preparePizza("DeepDish Pizza", true);

    expect(pizza.preparePizza).to.have.been.calledOnce;
  });
});
