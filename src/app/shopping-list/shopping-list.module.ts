import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const shopRoutes: Routes = [
  { path: '', 
component: ShoppingListComponent,
children: [
    { 
      path: 'edit',
      component: ShoppingEditComponent 
    }]
 }]   

@NgModule({
  declarations: [
    ShoppingListComponent, 
    ShoppingEditComponent
  ],
  imports: [    
    FormsModule,
    SharedModule, // De SharedModule solo necesitamos el CommonModule aqui por eso lo importamos
    // En vez de hacer un archivo de rutas, directamente en el import
    RouterModule.forChild(shopRoutes)
  ]
})
export class ShoppingListModule { }
