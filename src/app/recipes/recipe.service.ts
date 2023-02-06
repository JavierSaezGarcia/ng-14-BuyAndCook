import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Creamos el objeto EventEmitter de tipo Recipe y lo asignamos a la propiedad de la clase recipeSelected
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {};

  private recipes: Recipe[] = [
    new Recipe('Arroz al Horno Valenciano',
    'Receta de arroz donde las haya. Sencilla de realizar y exquisita de degustar.',
    'https://www.villacedeira.com/wp-content/uploads/2018/10/arroz-al-horno-valenciano.jpg',
    [
      new Ingredient('Arroz', 500, 'gr'),
      new Ingredient('Morcilla', 1, 'un')

    ]),
    new Recipe('Chipirones encebollados',
    'Existe una receta que apuesta por la cebolla como principal acompañante',
    'https://ep01.epimg.net/elcomidista/imagenes/2022/02/28/receta/1646061489_765186_1646062631_media_normal_recorte2.jpg',
    [
      new Ingredient('Chipirones', 1000, 'gr'),
      new Ingredient('Cebolla', 3, 'un')

    ]),
    new Recipe('Pimientos rojos rellenos de arroz',
    'Hacer esta receta siempre me evoca recuerdos de cuando era un niño y mi abuela hacía 8 ó 9 para toda la familia. ',
    'http://1.bp.blogspot.com/-DoHoCNJ48Ww/Tyo0ZNCy6JI/AAAAAAAACVI/gQabCI76QS4/s1600/pimientos+rellenos+de+arroz+y+carneeee+.jpg',
    [
      new Ingredient('Pimientos', 1500, 'gr'),
      new Ingredient('Magro', 500, 'gr')

    ])
  ]; 

  getRecipes(){
    // Creo un array copia de recipes para no modificar el original
    // aunque funciona si quitamos el slice()
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
