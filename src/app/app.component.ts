import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'BuyAndCook';
  // lo inicializo aunque no recojo nada es para mostrar sin clicar una ventana
  loadedFeature = 'recipe';
  // feature es el evento ( $event) que recojo del output
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
