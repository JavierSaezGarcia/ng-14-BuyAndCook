import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list-reducer';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  
  // @ViewChild('nameInput', { static: false }) nameInputRef:ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef:ElementRef;
  // @ViewChild('selectInput', { static: false }) selectInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('form', {static:false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>){}
  
  ngOnInit(): void {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe( stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.editedItemIndex = stateData.editedIngredientIndex;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          measure: this.editedItem.measure
        })
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.startedEditing
    //     .subscribe( 
    //       (index: number ) => {
    //       this.editedItemIndex = index;
    //       this.editedItem = this.shoppingListService.getIngredient(index);
    //       this.editMode = true;    
          
                  
    //     });
  }
  
 
  onSubmit(form: NgForm) {    
    const value = form.value;
    const newIngredient = new Ingredient( value.name, value.amount, value.measure );
    if( this.editMode ) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    }else{
      // this.ingredientAdded.emit(newIngredient);
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    form.reset();
    this.editMode = false;
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onDelete() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex);
    if( this.editMode ) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    }
    this.onClear();    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  

}


