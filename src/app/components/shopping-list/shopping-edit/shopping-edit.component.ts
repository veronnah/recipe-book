import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from "../../../models/ingredient.model";
import { ShoppingListService } from "../../../services/shopping-list.service";
import { FormGroupDirective, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Patterns } from "../../../constants/patterns.constant";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @Input() ingredients: Ingredient[];
  public addIngredientsForm: UntypedFormGroup;
  public editedItemIdx: number;
  public editedItem: Ingredient;
  public editMode: boolean;
  public editingSub: Subscription;
  public onlyPositiveNumbers: string;
  public units: string[] = ['gr', 'kg', 'ml', 'pcs'];
  public selectedUnits: string = this.units[0];

  constructor(
    private shoppingListService: ShoppingListService,
    public fb: UntypedFormBuilder,
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
      unit: [this.units[0], Validators.required],
    })
  }

  public getEditingItem(): void {
    this.editingSub = this.shoppingListService.editingItemIdx
      .subscribe((index: number) => {
        this.editedItemIdx = index;
        this.editMode = true;
        this.editedItem = this.ingredients[index];
        this.addIngredientsForm.patchValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.unit,
        });
      });
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    const newIngredient: Ingredient = this.addIngredientsForm.value;
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIdx, newIngredient).subscribe();
    } else {
      this.shoppingListService.addIngredient(newIngredient).subscribe();
    }
    this.clearForm();
    formDirective.resetForm();
  }

  public deleteItem(): void {
    this.shoppingListService.deleteIngredient(this.editedItemIdx).subscribe();
    this.clearForm();
  }

  public clearForm(): void {
    this.editMode = false;
    this.addIngredientsForm.reset();
  }

  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
  }
}
