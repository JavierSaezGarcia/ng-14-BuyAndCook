import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  
  // @Output() recipeWasSelected = new EventEmitter<Recipe>(); 

  recipes: Recipe[];
  recipeSubs: Subscription;


  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.recipeSubs = this.recipeService.recipesChanged
      .subscribe( 
        (recipes:Recipe[]) => {
          this.recipes = recipes;
        }
      )
    // Recogemos la emision (emit) del hijo (recipe-item)
    this.recipes = this.recipeService.getRecipes();
    
    
  } 
  
  ngOnDestroy(): void {
    this.recipeSubs.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(["new"], {relativeTo: this.route});
  }
  
}
