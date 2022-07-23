import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  public isLoaded: boolean;

  public onLoaded(isLoaded: boolean): void {
    this.isLoaded = isLoaded;
  }
}
