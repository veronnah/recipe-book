import { Component } from "@angular/core";
import { DataStorageServiceService } from "../../services/data-storage-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  constructor(private dataStorageService: DataStorageServiceService) {
  }

  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes();
  }
}
