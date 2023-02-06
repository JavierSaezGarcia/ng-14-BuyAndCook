import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  
  @ViewChild('nameInput', { static: false }) nameInputRef:ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef:ElementRef;
  @ViewChild('selectInput', { static: false }) selectInputRef:ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
 
  constructor( private shoppingListService: ShoppingListService){}
 
  onAddIngredient(){
    let ingName = this.nameInputRef.nativeElement.value;
    let ingAmount = this.amountInputRef.nativeElement.value;
    let selectInput = this.selectInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount, selectInput);
    // this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.addIngredient(newIngredient);
    
    this.nameInputRef.nativeElement.value = ''; 
    this.amountInputRef.nativeElement.value = null;   
    this.nameInputRef.nativeElement.focus();
  }
  

}


