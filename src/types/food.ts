enum FoodGroup {
  Fruit = 'Fruit',
  Vegetable = 'Vegetable',
  Protein = 'Protein',
  Dairy = 'Dairy',
  Grain = 'Grain',
  Fat = 'Fat',
  Sweet = 'Sweet',
  Other = 'Other',
}

interface IFood {
  name: string;
  foodGroup: FoodGroup;
  ingredients: string[];
  calories: number;
  description?: string;

  getCalories(): number;
}

export { FoodGroup, IFood };
