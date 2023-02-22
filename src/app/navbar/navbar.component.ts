import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private dataStorageService: DataStorageService) {}

  onSavedata(){
    this.dataStorageService.storeRecipes();
  }

  onFetchdata(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
    
}
