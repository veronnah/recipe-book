import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-data-dialog',
  templateUrl: './edit-user-data-dialog.component.html',
  styleUrls: ['./edit-user-data-dialog.component.scss']
})
export class EditUserDataDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
