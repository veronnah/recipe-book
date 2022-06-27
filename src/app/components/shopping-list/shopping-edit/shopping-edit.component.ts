import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";
import { ShoppingListService } from "../../../services/shopping-list.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public addIngredientsForm: FormGroup;
  public editedItemIdx: number;
  public editedItem: Ingredient;
  public editMode: boolean;

  public editingSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initIngredientsForm();
    this.getEditingItem();
  }

  public initIngredientsForm(): void {
    this.addIngredientsForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  public getEditingItem(): void {
    this.editingSub = this.shoppingListService.editingItemIdx
      .subscribe((index: number) => {
        this.editedItemIdx = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.addIngredientsForm.patchValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      });
  }

  public onSubmit(): void {
    const newIngredient: Ingredient = this.addIngredientsForm.value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIdx, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.addIngredientsForm.reset();
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
  }
}
