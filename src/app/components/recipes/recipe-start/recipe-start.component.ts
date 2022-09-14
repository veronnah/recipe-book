import { Component, HostBinding } from '@angular/core';
import { routeFadeStateTrigger } from '../../../shared/animations/fader';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.scss'],
  animations: [
    routeFadeStateTrigger,
  ],
})
export class RecipeStartComponent {
  @HostBinding('@routeFadeState') routeAnimation = true;
}
