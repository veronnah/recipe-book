import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { Subscription } from "rxjs";
import { DataStorageService } from "../../../services/data-storage.service";

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
    private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.setRecipes();
    this.fetchRecipes();
  }

  public fetchRecipes(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  public setRecipes(): void {
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
