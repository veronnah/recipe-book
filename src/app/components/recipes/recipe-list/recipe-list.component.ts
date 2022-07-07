import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { Subscription } from "rxjs";
import { DataStorageServiceService } from "../../../services/data-storage-service.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  public recipeChangesSub: Subscription;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageServiceService) {
  }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes();
    this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeChangesSub?.unsubscribe();
  }
}
