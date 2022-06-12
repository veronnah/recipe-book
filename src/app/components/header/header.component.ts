import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

  public onSelect(tabName: string): void {
    this.tabSelected.emit(tabName);
  }

}
