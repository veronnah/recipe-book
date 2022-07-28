import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./components/loader/loader.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleClassOpenDirective } from "./directives/toggleClassOpen.directive";

@NgModule({
  declarations: [
    LoaderComponent,
    SpinnerComponent,
    ToggleClassOpenDirective,
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
    ToggleClassOpenDirective,
  ],
})
export class SharedModule {
}
