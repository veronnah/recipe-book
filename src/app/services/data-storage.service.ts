import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../models/recipe.model";
import { environment } from "../../environments/environment";
import { map, Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {
  }

  public storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put<Recipe[]>(`${environment.apiUrl}/recipes.json`, recipes)
      .subscribe(() => {
      });
  }

  public fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(
      `${environment.apiUrl}/recipes.json`)
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            }
          })
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }

}
