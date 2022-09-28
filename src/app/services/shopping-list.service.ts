import { Injectable } from '@angular/core';
import { Ingredient } from "../models/ingredient.model";
import { map, Observable, Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  public ingredients: Ingredient[] = [];
  public ingredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  public editingItemIdx: Subject<number> = new Subject<number>();

  public units: string[] = ['gr', 'kg', 'ml', 'pcs'];
  public selectedUnits: string = this.units[0];

  constructor(
    private http: HttpClient,
  ) {
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.apiUrl}/shopping-ingredients.json`)
      .pipe(map((ingredients: Ingredient[]) => {
        this.ingredients = [];
          return ingredients?.map((ingredient: Ingredient) => {
            this.ingredients.push(ingredient);
            return {
              ...ingredient,
            }
          })
        })
      );
  }

  private putIngredients(): Observable<Ingredient[]> {
    return this.http.put<Ingredient[]>
    (`${environment.apiUrl}/shopping-ingredients.json`, this.ingredients);
  }

  public addIngredient(ingredient: Ingredient): Observable<Ingredient[]> {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
    return this.putIngredients();
  }

  public addIngredients(ingredients: Ingredient[]): Observable<Ingredient[]> {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
    return this.putIngredients();
  }

  public updateIngredient(index: number, newIngredient: Ingredient): Observable<Ingredient[]> {
    this.ingredients[index] = newIngredient;
    this.ingredientAdded.next(this.ingredients.slice());
    return this.putIngredients();
  }

  public deleteIngredient(index: number): Observable<Ingredient[]> {
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
    return this.putIngredients();
  }
}
