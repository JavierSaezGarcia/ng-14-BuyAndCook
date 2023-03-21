import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';

import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [  
    // Declaracion de componentes generales que pertenecen a appcomponent  
    AppComponent,
    HeaderComponent,     
    FooterComponent,       
    NavbarComponent  
    
  ],
  imports: [
    // Importando del core de Angular    
    BrowserModule,
    HttpClientModule,
    // Importado del archivo de configuracion de la ruta principal de la aplicacion
    AppRoutingModule,   
    // Importacion de los modulos de caracteristicas de los bloques o FeatureModules  
    StoreModule.forRoot(fromApp.appReducer),   
    CoreModule, EffectsModule.forRoot([])
  ], 
  
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  
}

