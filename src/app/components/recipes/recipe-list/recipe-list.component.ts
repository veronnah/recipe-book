import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [
    new Recipe('Test recipe', 'Dummy test', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'),
    new Recipe('Test recipe', 'Dummy test', 'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg'),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
