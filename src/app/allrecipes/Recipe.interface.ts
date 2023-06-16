export interface Recipe {
  recipe_id: number;
  imgUrl: string;
  recipe_name: string;
  cookingTime: string;
  origin: {
    country: string;
    flag: string;
  };
  budget: string;
  category: {
    dish: boolean;
    dessert: boolean;
    starter: boolean;
    aperitif: boolean;
  };
  prep_time: string;
  cook_time: string;
  ingredients: string[];
  allergens: string[];
  diet: string;
  steps: string[];
  country_of_origin: string;
}
