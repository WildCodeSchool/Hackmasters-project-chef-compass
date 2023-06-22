export interface Recipe {
    recipe_id: number;
    recipe_type: string;
    recipe_name: string;
    country_of_origin: string;
    prep_time: string;
    cook_time: string;
    price: number;
    ingredients: string[];
    allergens: string[];
    diet: string[];
    steps: string[];
    imgUrl: string;
    description: string;
  }