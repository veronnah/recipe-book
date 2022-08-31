import { NgModule } from '@angular/core';

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        ShoppingListRoutingModule,
        MatSelectModule,
    ],
  providers: [],
})
export class ShoppingListModule {
}
