import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  
  titles: string[] = ['Arroz al Horno','Chipirones encebollados','Pimientos rellenos de arroz'];
  comentaries: string[] = [
    'Arroz auténtico valenciano hecho de la misma forma desde hace 100 años. \n',
    'Existe una receta que apuesta por la cebolla como principal acompañante',
    'Hacer esta receta siempre me evoca recuerdos de cuando era un niño y mi abuela hacía 8 ó 9 para toda la familia. '
  ]

  constructor(private store: Store<fromApp.AppState>) {};
  
  private recipes: Recipe[] = [];
  
  
    
  
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  

  getRecipes(){
    // Creo un array copia de recipes para no modificar el original
    // aunque funciona si quitamos el slice()
    return this.recipes.slice();
  }
  

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }
  getRecipeById(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next( this.recipes.slice());   

  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index]= newRecipe;
    this.recipesChanged.next( this.recipes.slice());    
  }
  deleteRecipe(index: number) {
    
    this.recipes.splice(index, 1);    
    this.recipesChanged.next( this.recipes.slice());   
  }
  
  
}
