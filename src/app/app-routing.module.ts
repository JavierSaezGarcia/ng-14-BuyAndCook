import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    
    { path: '', redirectTo: 'recipes', pathMatch: 'full'}, // pathMatch: 'full' hay que ponerlo por que tiene que buscar una ruta completa 
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then( m => m.RecipesModule )},
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then( m => m.ShoppingListModule ) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) }
];

@NgModule({
    declarations: [],
    // El metodo .forRoot solo se importa una vez
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    // y RouterModule se debe exportar para poder usarlo con rutas hijas .forChild tantas veces como necesitemos
    exports: [RouterModule]
})
export class AppRoutingModule { }
  