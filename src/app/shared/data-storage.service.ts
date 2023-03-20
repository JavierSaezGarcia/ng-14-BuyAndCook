import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs';


import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { Ingredient } from './ingredient.model';




@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
 
  private urlRecipes: string = 'https://ng-recipe-book-6bf5d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';
  private recipeIn: Recipe[];
  
  
  constructor(private http: HttpClient, 
              private recipeService: RecipeService,
              private authService: AuthService) { }
            
  storeRecipes() {
    // Recuperamos las recetas que tenemos escritas en la app de inicio
    const recipes = this.recipeService.getRecipes();
    // Ahora las enviamos a la BD
    this.http
      .put(
        this.urlRecipes, 
        recipes 
      ).subscribe(response => {
        console.log('response',response);
      })
  }
  fetchRecipes() {
    
        return this.http
        .get<Recipe[]>(this.urlRecipes
        // o return this.http.get<Recipe[]>(this.urlRecipes + '?auth=' + user.token) pero es mejor la sigueinte opcion
          // {
          //   params: new HttpParams().set('auth', this.authService.user. )
          // }
        )
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
  fetchRecipesWith( condition: string ){   
    
    return this.http
      .get<Recipe[]>(this.urlRecipes)
      .pipe(      
        map(recipes => {        
        if(condition){          
          this.recipeIn = recipes.filter( titulo => 
            titulo.name.toLowerCase().trim().startsWith(condition.toLowerCase().trim()) ||      
            titulo.name.toLowerCase().includes(condition) || 
            titulo.ingredients.find( ingrediente => ingrediente.name.toLowerCase().trim().includes(condition.toLowerCase().trim())) ||
            titulo.ingredients.find( ingrediente => ingrediente.name.toLowerCase().trim().startsWith(condition.toLowerCase().trim())) ||
            titulo.ingredients.find( ingrediente => ingrediente.name.toLowerCase().trim().endsWith(condition.toLowerCase().trim()))
          )
         

          if(this.recipeIn.length > 0){
            
            return this.recipeIn;
          }else{
             alert('No hay ningun resultado con esta búsqueda. Pruebe de nuevo');
             return recipes.map(recipe => {          
              return {
                ...recipe, 
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            })   

          }
          
         

        }else{
          return recipes.map(recipe => {          
            return {
              ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          })     

        }        
        }), 
        
        tap( recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
      

  }  
        
           
     

  
}
