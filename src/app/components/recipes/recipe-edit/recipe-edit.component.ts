import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecipeService } from "../../../services/recipe.service";
import { Recipe } from "../../../models/recipe.model";
import { Patterns } from "../../../constants/patterns.constant";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditComponent implements OnInit {
  public recipeId: number;
  public editMode: boolean;
  public recipeForm: FormGroup;
  public recipeIngredients: FormArray = new FormArray([]);
  public recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
            this.initRecipeIngredientsForm();
          }
          this.initEditForm();
          console.log(this.recipeForm.invalid)
        }
      );
  }

  private initRecipeIngredientsForm(): void {
    this.recipe = this.recipeService.getRecipe(this.recipeId);
    if (this.recipe['ingredients']) {
      for (let ingredient of this.recipe.ingredients) {
        this.recipeIngredients.push(
          this.fb.group({
            name: [ingredient.name, Validators.required],
            amount: [ingredient.amount, [
              Validators.required,
              Validators.pattern(Patterns.onlyPositiveNum)
            ]],
          })
        );
      }
    }
  }

  private initEditForm(): void {
    this.recipeForm = this.fb.group({
      name: [this.recipe?.name, Validators.required],
      imagePath: [this.recipe?.imagePath, Validators.required],
      description: [this.recipe?.description, Validators.required],
      ingredients: this.recipeIngredients,
    })
  }

  get recipeFormArray(): FormArray {
    return (<FormArray>this.recipeForm.get('ingredients'));
  }

  public onAddIngredients(): void {
    this.recipeFormArray.push(
      this.fb.group({
        name: ['', Validators.required],
        amount: ['', [
          Validators.required,
          Validators.pattern(Patterns.onlyPositiveNum)
        ]],
      })
    )
  }

  public onDeleteIngredients(index: number): void {
    this.recipeFormArray.removeAt(index);
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  public onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
