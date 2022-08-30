import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DataStorageService } from "../../../services/data-storage.service";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public recipeId: number;
  public isLoaded: boolean;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getRecipe();
  }

  public getRecipe(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.recipeId = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeId);
        this.isLoaded = true;
      });
  }

  public onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/']);
  }

  public addToShoppingList(): void {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
