import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../../models/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Cucumbers', 300),
    new Ingredient('Tomatoes', 3),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onIngredientAdded(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }
}
