import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe( 'Test Recipe', 'This is Test Recipe', 'https://get.pxhere.com/photo/food-cuisine-dish-ingredient-bread-baked-goods-soda-bread-produce-staple-food-stollen-hefekranz-loaf-damper-dessert-Easter-bread-finger-food-sourdough-rye-bread-recipe-gluten-potato-bread-1558091.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}