import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private urlRecipes: string = 'https://ng-recipe-book-6bf5d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor( private http: HttpClient, private recipeService: RecipeService) { }
  
  storeRecipes() {
    // Recuperamos las recetas que tenemos escritas en la app de inicio
    const recipes = this.recipeService.getRecipes();
    // Ahora las enviamos a la BD
    this.http
      .put(
        this.urlRecipes, 
        recipes 
      )
      .subscribe(response => {
        console.log(response);
      })
  }
  fetchRecipes() {
   return this.http
      .get<Recipe[]>(this.urlRecipes)
      .pipe(
        map(recipes => {
           return recipes.map(recipe => {          
                  return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                  };
                })       
         }),
         tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })       
      )         
     

  }
}