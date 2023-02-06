import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe;
  // feature es el evento ( $event) que recojo del output

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    // recibimos la receta seleccionada de recipelist y recipe item
    this.recipeService.recipeSelected
      .subscribe( 
        (recipe:Recipe) => {
          // y la asignamos a la propiedad de la clase selectedRecipe
          this.selectedRecipe = recipe;
        }
      )
  }

  
 
  

}
