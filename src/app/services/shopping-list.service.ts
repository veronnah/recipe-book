import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredientAdded: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();
  public ingredients: Ingredient[] = [
    new Ingredient('Cucumbers', 300),
    new Ingredient('Tomatoes', 3),
  ];

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.emit(this.ingredients.slice());
  }

  public addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.emit(this.ingredients.slice());
  }
}
