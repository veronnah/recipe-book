import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public onAddItem(nameInput: HTMLInputElement, amountInput: HTMLInputElement): void {
    const newIngredient = new Ingredient(nameInput.value, +amountInput.value);
    this.ingredientAdded.emit(newIngredient);
  }

}
