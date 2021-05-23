import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
    new Recipe(
    'Test Recipe',
    'This is a Test Recipe',
    'https://get.pxhere.com/photo/food-cuisine-dish-ingredient-bread-baked-goods-soda-bread-produce-staple-food-stollen-hefekranz-loaf-damper-dessert-Easter-bread-finger-food-sourdough-rye-bread-recipe-gluten-potato-bread-1558091.jpg',
     [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 17)
     ]),
    new Recipe(
    'Another Test Recipe',
    'This is a Test Recipe',
    'https://get.pxhere.com/photo/food-cuisine-dish-ingredient-bread-baked-goods-soda-bread-produce-staple-food-stollen-hefekranz-loaf-damper-dessert-Easter-bread-finger-food-sourdough-rye-bread-recipe-gluten-potato-bread-1558091.jpg',
    [
      new Ingredient('Bun', 2),
      new Ingredient('Meat', 2)
    ])
  ];

  constructor(private slService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice();
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
