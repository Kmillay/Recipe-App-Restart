import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor({
    name = '',
    description = '',
    imagePath ='',
    ...rest
  }) {
    Object.assign(this, rest)
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = rest.ingredients && rest.ingredients.length ? rest.ingredients : [];
  }
}
