import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // creo el objeto de tipo EventEmitter y es lo que voy a exportar 
  // cuando recoja por parametro un evento en este caso un click
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string ) {  
    console.log(feature);
    // emito el evento con .emit y el parametro feature para recogerlo fuera
    this.featureSelected.emit(feature);
  }

}
