import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  // recipe es la referencia @Input() que se exportara al padre recipeItemComponent.html
  @Input() recipe: Recipe;
  //  @Output() recipeSelected = new EventEmitter<void>();   
  constructor(private recipeService: RecipeService) {}

  onRecipeSelected(){
    // Queremos emitir un evento click onRecipeSelected() de la receta seleccionada con emit
    this.recipeService.recipeSelected.emit(this.recipe);
    // this.recipeSelected.emit();
  }
  

}
