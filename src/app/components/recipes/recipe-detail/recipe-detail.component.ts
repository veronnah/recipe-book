import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  public addToShoppingList(): void {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
