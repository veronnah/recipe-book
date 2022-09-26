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
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ToggleClassOpenDirective,
    SpinnerComponent,
    EditUserDataDialogComponent,
    ConfirmationPopupComponent,
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
    MatSelectModule,
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
    MatSelectModule,
  ],
})
export class SharedModule {
}
