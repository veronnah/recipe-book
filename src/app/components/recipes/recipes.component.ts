import { Component, HostBinding } from '@angular/core';
import { routeFadeStateTrigger } from '../../shared/animations/fader';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    routeFadeStateTrigger,
  ]
})
export class RecipesComponent {
  @HostBinding('@routeFadeState') routeAnimation = true;
  public isLoaded: boolean;

  public onLoaded(isLoaded: boolean): void {
    this.isLoaded = isLoaded;
  }
}
