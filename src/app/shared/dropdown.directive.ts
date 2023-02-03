import { Directive, 
         ElementRef, 
         HostBinding, 
         HostListener, 
         Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    // NO IMPLEMENTO ESTA DIRECTIVA PORQUE ME PARECE 
    // MAS EFICIENTE QUE EL FRAMEWORK HAGA SUS FUNCIONES PARA LA QUE ESTA DISEÑADO
    isOpen: boolean = false;
    @HostListener('document:click', ['$event'])
    DocumentClick(event: Event) {
      const dropDown: any = this.elRef.nativeElement.nextElementSibling;
      if (this.elRef.nativeElement.contains(event.target)) {
        if (!this.isOpen) {
          this.renderer.addClass(dropDown, 'show');
          this.isOpen = true;
        } else {
          this.renderer.removeClass(dropDown, 'show');
          this.isOpen = false;
        }
      } else {
        this.renderer.removeClass(dropDown, 'show');
        this.isOpen = false;
      }
    }
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  
}
