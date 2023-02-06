import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // 2.- para que funcione creamos un objeto emisor 
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  constructor() { }

  private ingredients: Ingredient[] = [
    new Ingredient( 'Arroz', 500 ,'gr'),
    new Ingredient( 'Tomate', 400 , 'gr')
  ];

  getIngredients() {
    // 1.- Como devolvemos una copia no se actualiza el total con el nuevo elemento
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // 3.- emitimos la copia con el array completo para depues recogerlo en un observable que
    // escucha los eventos en el shoppingListComponent.ts
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // Esta no es una forma muy aconsejada, demasiados eventos
    // for(let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // Esta es una mejor forma ya que con el operador rest enviamos una lista de ingredientes individuales 
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());

  }

  

}
