import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataStorageServiceService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {
  }

  public storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(`${environment.apiUrl}recipes.json`, recipes)
      .subscribe(() => {
      });
  }

  public fetchRecipes(): void {
    this.http.get<Recipe[]>(`${environment.apiUrl}recipes.json`)
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }

}
