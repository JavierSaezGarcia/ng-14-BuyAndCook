import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  // El mensaje vendra desde fuera por eso el input
  @Input() message: string;
  // Se acciona un evento desde dentro con el boton hasta donde se plasma la vetana modal para cerrarla
  @Output() close =  new EventEmitter<void>();

  

  onClose() {
    this.close.emit();
  }

}
