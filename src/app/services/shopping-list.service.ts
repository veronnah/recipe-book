import { Injectable } from '@angular/core';
import { Ingredient } from "../models/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  public editingItemIdx: Subject<number> = new Subject<number>();

  public ingredients: Ingredient[] = [
    new Ingredient('Cucumbers', 300),
    new Ingredient('Tomatoes', 3),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  public updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
  }

  public deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}
