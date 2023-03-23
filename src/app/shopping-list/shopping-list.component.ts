import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions  from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import {
  trigger,
  state,
  style,
  animate,
  transition
  
} from '@angular/animations';





@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(100px)'
          

        }),
        animate('0.2s ease-in')
      ]) 
    ])
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  ingredients: Observable<{ingredients:  Ingredient[]}>;
  
  // es recomendable crear una propiedad de tipo Subscription 
  // y asignarle el observable para despues podernos desubscribir en el OnDestroy
  // private changeSubs: Subscription;
  // Inyectamos el sevicio
  constructor(private store: Store<fromApp.AppState>){}
  
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    
    // this.ingredients = this.shoppingListService.getIngredients();
    
    // Despues de recoger los ingredientes nos subscribimos y asignamos los que recibimos 
    // this.ingredients = a lo que recibimos por el escuchador de eventos this.shoppingListService.ingredientsChanged
    // que lo inicializamos en una funcion de flecha como paranmetro 'ingredients' como si lo llamamos pepito
    // this.changeSubs = this.shoppingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients:Ingredient[]) => { 
    //       this.ingredients = ingredients; 
          
    //     }
    //   )      
  }

  ngOnDestroy(): void {
    // No necesitamos desubscribirnos ya que al usar ngrx todas las subscripciones las cierra por nosotros
    // this.changeSubs.unsubscribe();
   
  }
  onEditItem(index: number){
    // console.log(this.ingredients[index].name);
    // this.shoppingListService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
  
  


  // onIngredientAdded(ingredient: Ingredient){
    
  //   this.ingredients.push(ingredient);    
  // }

}
