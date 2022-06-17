import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public recipeId: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeId = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      })
  }

  public addToShoppingList(): void {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
