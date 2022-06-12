import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [
    new Recipe('Pasta', 'Dummy test', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'),
    new Recipe('Rice with chicken', 'Dummy test', 'https://assets.vogue.in/photos/5efdf623800c753aed1a4acd/2:3/w_2560%2Cc_limit/chicken%2520curry%2520recipe%2520homestyle%2520chicken%2520curry%2520recipe%2520easy%2520recipes%2520to%2520make%2520at%2520home%2520chicken%2520and%2520rice.jpg'),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  public onRecipeSelected(recipe: Recipe): void {
    this.recipeSelected.emit(recipe);
  }
}
