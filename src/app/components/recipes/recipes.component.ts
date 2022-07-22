import { Component } from '@angular/core';
import { Data, RouterOutlet } from "@angular/router";
import { fader } from "../../animations/route-animations";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations: [
    fader,
  ]
})
export class RecipesComponent {
  public prepareRoute(outlet: RouterOutlet): RouterOutlet | Data {
    return outlet && outlet.activatedRouteData['animation'];
  }
}
