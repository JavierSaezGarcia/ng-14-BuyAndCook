import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[];
  // Inyectamos el sevicio
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    // Despues de recoger los ingredientes nos subscribimos y asignamos los que recibimos 
    // this.ingredients = a lo que recibimos por el escuchador de eventos this.shoppingListService.ingredientsChanged
    // que lo inicializamos en una funcion de flecha como paranmetro 'ingredients' como si lo llamamos pepito
    this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) => { 
          this.ingredients = ingredients; 
        }
      )
  }


  // onIngredientAdded(ingredient: Ingredient){
    
  //   this.ingredients.push(ingredient);    
  // }

}
