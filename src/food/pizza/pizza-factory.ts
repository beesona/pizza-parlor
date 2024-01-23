import { FoodGroup } from "../../types/food";
import { IDeepDishPizza, IPizza, ITavernPizza } from "../../types/pizza";
import { Food } from "../food";

// We have some refactor we could do here to make the pizza
// more generic (eg. we shouldn't have a hard-coded "DeedDish" and "Tavern").
class DeepDishPizza extends Food implements IDeepDishPizza {
  constructor(
    public toppings: string[],
    public doughType: "Seminole" | "Wheat"
  ) {
    super("Pizza", FoodGroup.Grain, [...toppings, `${doughType} Flour`], 3000);
  }

  preparePizza(name: string, includeDate: boolean = false): void {}
}

class TavernPizza extends Food implements ITavernPizza {
  constructor(
    public toppings: string[],
    public squareCutSize: "Small" | "Medium" | "Large"
  ) {
    super("Pizza", FoodGroup.Grain, [...toppings, "Flour"], 3000);
  }

  preparePizza(name: string): void {}
}

class PizzaFactory {
  static createPizza(type: "DeepDish" | "Tavern", toppings: string[]): IPizza {
    switch (type) {
      case "DeepDish":
        return new DeepDishPizza(toppings, "Seminole");
      case "Tavern":
        return new TavernPizza(toppings, "Large");
      default:
        throw new Error("Invalid pizza type...");
    }
  }
}

export { PizzaFactory };