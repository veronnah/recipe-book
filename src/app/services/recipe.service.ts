import { Injectable } from '@angular/core';
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  public recipes: Recipe[] = [
    new Recipe('' +
      'Pasta',
      'Dummy test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg',
      [
        new Ingredient('macaroni', 500),
        new Ingredient('tomatoes', 3),
        new Ingredient('basil', 100),
        new Ingredient('flavoring', 20),
      ]),
    new Recipe(
      'Rice with chicken',
      'Dummy test',
      'https://assets.vogue.in/photos/5efdf623800c753aed1a4acd/2:3/w_2560%2Cc_limit/chicken%2520curry%2520recipe%2520homestyle%2520chicken%2520curry%2520recipe%2520easy%2520recipes%2520to%2520make%2520at%2520home%2520chicken%2520and%2520rice.jpg',
      [
        new Ingredient('rice', 400),
        new Ingredient('chicken', 250),
        new Ingredient('flavoring', 20),
        new Ingredient('onion', 2),
      ]),
    new Recipe(
      'Burger',
      'big yummy burger',
      'https://s3.envato.com/files/293913458/2020_01_14_7787_2_S.jpg',
      [
        new Ingredient('buns', 2),
        new Ingredient('meat', 1),
        new Ingredient('salad', 100),
        new Ingredient('onion', 0.5),
      ]),
    new Recipe(
      'Cheeseburger',
      'big yummy cheeseburger',
      'https://s3.envato.com/files/251784109/IMG_1443_18.jpg',
      [
        new Ingredient('buns', 2),
        new Ingredient('meat', 1),
        new Ingredient('salad', 100),
        new Ingredient('cheese', 200),
      ]),
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  public getRecipe(id: number): Recipe {
    return this.recipes[id];
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
