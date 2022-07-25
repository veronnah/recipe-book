import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./components/loader/loader.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "./directives/dropdown.directive";

@NgModule({
  declarations: [
    LoaderComponent,
    SpinnerComponent,
    DropdownDirective,
  ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    SpinnerComponent,
    DropdownDirective,
  ],
})
export class SharedModule {
}
