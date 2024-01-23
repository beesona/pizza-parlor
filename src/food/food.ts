import type { FoodGroup, IFood } from '../types/food';

abstract class Food implements IFood {
  constructor(
    public name: string,
    public foodGroup: FoodGroup,
    public ingredients: string[],
    public calories: number,
    public description?: string
  ) {}

  getCalories(): number {
    return this.calories;
  }
}

export { Food };
