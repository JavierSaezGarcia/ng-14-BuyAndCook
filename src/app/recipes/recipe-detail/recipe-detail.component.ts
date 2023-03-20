import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  
  recipe: Recipe;
  id: number;

  constructor( private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService, ){}
  ngOnInit() {
    this.route.params
      .subscribe(
        (params:Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipeById(this.id);
        }
      )
  }

  onAddToShoppingList(){
    
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    
    
    this.router.navigate(['shopping-list']);
  }
  
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // Otra forma si no estuvieramos en el mismo archivo que editamos
    // this.router.navigate(['../', this.id,'edit'], {relativeTo: this.route}); 
    // Me daba error porque habia que subir un nivel en la ruta con '../'
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);   
    this.dataStorageService.storeRecipes();
    this.router.navigate(['../'],{relativeTo: this.route} );
  }
  
  
 
}
