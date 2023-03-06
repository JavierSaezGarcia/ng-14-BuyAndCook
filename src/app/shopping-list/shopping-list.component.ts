import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[];
  
  // es recomendable crear una propiedad de tipo Subscription 
  // y asignarle el observable para despues podernos desubscribir en el OnDestroy
  private changeSubs: Subscription;
  // Inyectamos el sevicio
  constructor(private shoppingListService: ShoppingListService){}
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    
    // Despues de recoger los ingredientes nos subscribimos y asignamos los que recibimos 
    // this.ingredients = a lo que recibimos por el escuchador de eventos this.shoppingListService.ingredientsChanged
    // que lo inicializamos en una funcion de flecha como paranmetro 'ingredients' como si lo llamamos pepito
    this.changeSubs = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) => { 
          this.ingredients = ingredients; 
          
        }
      )      
  }

  ngOnDestroy(): void {
    this.changeSubs.unsubscribe();
  }
  onEditItem(index: number){
    // console.log(this.ingredients[index].name);
    this.shoppingListService.startedEditing.next(index);
  }
  
  


  // onIngredientAdded(ingredient: Ingredient){
    
  //   this.ingredients.push(ingredient);    
  // }

}
