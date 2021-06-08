import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { Recipe } from '../recipes/recipe.model'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
    new Recipe(
    'Food',
    'This is a food',
    'https://get.pxhere.com/photo/food-cuisine-dish-ingredient-bread-baked-goods-soda-bread-produce-staple-food-stollen-hefekranz-loaf-damper-dessert-Easter-bread-finger-food-sourdough-rye-bread-recipe-gluten-potato-bread-1558091.jpg',
     [
       new Ingredient('Meat', 1),
       new Ingredient('French Fries', 17)
     ]),
    new Recipe(
    'Sandwich',
    'This is a sandwich',
    'https://get.pxhere.com/photo/food-cuisine-dish-ingredient-bread-baked-goods-soda-bread-produce-staple-food-stollen-hefekranz-loaf-damper-dessert-Easter-bread-finger-food-sourdough-rye-bread-recipe-gluten-potato-bread-1558091.jpg',
    [
      new Ingredient('Bun', 2),
      new Ingredient('Meat', 2)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice());
  }

}
