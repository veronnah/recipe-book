import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loadedTab: string = 'recipe';

  public onNavigate(tabName: string): void {
    this.loadedTab = tabName;
  }
}
