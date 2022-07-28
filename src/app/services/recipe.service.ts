import { Injectable } from '@angular/core';
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import * as ShoppingListAction from "../components/shopping-list/store/shopping-list.actions";
import * as fromApp from '../components/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();
  public isRecipesLoaded: Subject<boolean> = new Subject<boolean>();
  public recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>,
  ) {
  }

  public setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
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

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  public addToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListAction.AddIngredients(ingredients));
  }
}
