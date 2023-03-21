import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  // recipe es la referencia @Input() que se exportara al padre recipeItemComponent.html
  @Input() recipe: Recipe;
  @Input() index: number;
  ngOnInit(): void {   
    
   
  }
  
  //  @Output() recipeSelected = new EventEmitter<void>();   
 

   

}
