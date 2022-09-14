import { Component, Input } from '@angular/core';
import { Recipe } from "../../../../models/recipe.model";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Input() recipeId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  /**
   * navigateToRecipeDetails added for animation trigger
   */

  public navigateToRecipeDetails(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.recipeId], { relativeTo: this.route })
      }
    );
  }
}
