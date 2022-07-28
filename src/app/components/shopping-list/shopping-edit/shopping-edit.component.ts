import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Patterns } from "../../../constants/patterns.constant";
import { Store } from "@ngrx/store";
import { State } from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  public addIngredientsForm: UntypedFormGroup;
  public editedItemIdx: number;
  public editedItem: Ingredient;
  public editMode: boolean;
  public editingSub: Subscription;
  public onlyPositiveNumbers: string;

  constructor(
    public fb: UntypedFormBuilder,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit(): void {
    this.initIngredientsForm();
    this.getEditingItem();
    this.setPattern();
  }

  public setPattern(): void {
    this.onlyPositiveNumbers = Patterns.onlyPositiveNum;
  }

  public initIngredientsForm(): void {
    this.addIngredientsForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  public getEditingItem(): void {
    this.editingSub = this.store
      .select('shoppingList')
      .subscribe((stateData: State) => {
        if (stateData.editedIngredientIdx > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.addIngredientsForm.patchValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  public onSubmit(): void {
    const newIngredient: Ingredient = this.addIngredientsForm.value;
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.clearForm();
  }

  public deleteItem(): void {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();
  }

  public clearForm(): void {
    this.editMode = false;
    this.addIngredientsForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(): void {
    this.editingSub?.unsubscribe();
  }
}
