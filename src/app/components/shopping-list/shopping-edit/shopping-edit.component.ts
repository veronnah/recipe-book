import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";
import { ShoppingListService } from "../../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
  }

  public onAddItem(nameInput: HTMLInputElement, amountInput: HTMLInputElement): void {
    const newIngredient = new Ingredient(nameInput.value, +amountInput.value);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
