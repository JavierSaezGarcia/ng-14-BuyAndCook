import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

 
  isAuthenticated = false;
  private userSub: Subscription;
  @ViewChild('filtro', { static: false }) inputName: ElementRef;
  
  
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    
    ) {}
  
  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map( authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user; // truco mas simple en vez de esto =>  !user ? false : true
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onFetchDataSelect( condition: string ){
    
    this.dataStorageService.fetchRecipesWith(condition).subscribe();
    this.inputName.nativeElement.value = '';
   
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    
    this.userSub.unsubscribe();
  }

    
}
