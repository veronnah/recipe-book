import { Component, OnInit } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";
import { ShoppingListService } from "../../../services/shopping-list.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  public addIngredientsForm: FormGroup;

  constructor(
    private shoppingListService: ShoppingListService,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initIngredientsForm();
  }

  public initIngredientsForm(): void{
    this.addIngredientsForm = this.fb.group({
      name: [''],
      amount: [''],
    })
  }

  public addItem(): void {
    this.shoppingListService.addIngredient(this.addIngredientsForm.value as Ingredient);
  }
}
