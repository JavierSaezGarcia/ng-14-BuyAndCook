import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from './recipes/recipes-resolver.service';


const appRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full'}, // pathMatch: 'full' hay que ponerlo por que tiene que buscar una ruta completa
    { path: 'recipes', component: RecipesComponent,
        children: [
            { path: '',component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },           
            { path: ':id/edit', component: RecipeEditComponent },
        ]
    },       
    
    { path: 'shopping-list', 
        component: ShoppingListComponent,
        children: [
            { path: 'edit',component: ShoppingEditComponent }
        ]

    },
    

];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
  