import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "./components/loader/loader.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToggleClassOpenDirective } from "./directives/toggleClassOpen.directive";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditUserDataDialogComponent } from './components/edit-user-data-dialog/edit-user-data-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoaderComponent,
    ToggleClassOpenDirective,
    SpinnerComponent,
    EditUserDataDialogComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonToggleModule,
    LoaderComponent,
    SpinnerComponent,
    ToggleClassOpenDirective,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class SharedModule {
}
