import { Component, HostBinding, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";
import { RecipeService } from "../../../services/recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DataStorageService } from "../../../services/data-storage.service";
import { routeFadeStateTrigger } from '../../../shared/animations/fader';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from '../../../shared/components/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  animations: [
    routeFadeStateTrigger,
  ]
})
export class RecipeDetailComponent implements OnInit {
  public recipe: Recipe;
  public recipeId: number;
  public isLoaded: boolean;
  @HostBinding('@routeFadeState') routeAnimation = true;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
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

  public openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent);
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'confirmed') {
        this.onDeleteRecipe();
      }
    });
  }

  public onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId);
    this.dataStorageService.storeRecipes();
    this.router.navigate(['/']);
  }

  public addToShoppingList(): void {
    this.recipeService.addToShoppingList(this.recipe.ingredients);
  }
}
