import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  isAuthenticated = false;
  userSub: Subscription;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState> ) {}
  
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; // si tiene parametros devolvera true y si no false          
          this.initForm();
        }
      );
      // this.userSub = this.authService.user.subscribe(user => {
      //   this.isAuthenticated = !!user; // truco mas simple en vez de esto =>  !user ? false : true
        
      //   console.log('que es',this.isAuthenticated);
      // });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imageUrl'],
    //   this.recipeForm.value['ingredients']);
    if( this.editMode ) {
      // this.recipeService.updateRecipe(this.id, newRecipe):
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.pattern(/^[1-9]+[0-9]*$/)),
        'measure': new FormControl(null)
      }),
    )
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onDeleteAllIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
    
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  

  private initForm() {
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if ( this.editMode ){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if ( recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {

          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              'measure': new FormControl(ingredient.measure )
            })
          );
        }
      }     

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl( recipeDescription, Validators.required ),
      'ingredients': recipeIngredients
    });
  }


  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  


  

  
}
