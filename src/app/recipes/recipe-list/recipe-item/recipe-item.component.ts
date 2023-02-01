import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  // recipe es la referencia @Input() que se exportara al padre recipeItemComponent.html
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();   

  onRecipeSelected(){
    
    this.recipeSelected.emit();
  }
  

}
