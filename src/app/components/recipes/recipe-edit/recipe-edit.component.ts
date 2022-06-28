import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RecipeService } from "../../../services/recipe.service";
import { Recipe } from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  public recipeId: number;
  public editMode: boolean;
  public recipeForm: FormGroup;
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService,
  ) {
  }

  ngOnInit(): void {
    this.getInfoFromRoute();
  }

  public getInfoFromRoute(): void {
    this.route.params
      .subscribe((params: Params) => {
          this.recipeId = +params['id'];
          this.editMode = params['id'] != null;
          if (this.editMode) {
            this.recipe = this.recipeService.getRecipe(this.recipeId);
          }
          this.initEditForm();
        }
      );
  }

  private initEditForm(): void {
    this.recipeForm = this.fb.group({
      name: [this.recipe.name],
      recipeImagePath: [this.recipe.imagePath],
      description: [this.recipe.description],
    })
  }

  public onSubmit(): void {
  }
}
