import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements AfterViewInit, OnDestroy{

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  
  // @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  // private closeSub: Subscription;

  // 1- Error alert with html
  @ViewChild("focus") inputFocused: ElementRef;

  constructor(
    private authService:AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    ) {}
 

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.login(email,password);
    }else{
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes/0']);
      },
      error: errorMessage => {
        console.log(errorMessage);    
        this.error = errorMessage;
        // Error alert create programaticamently
        // this.showErrorAlert(errorMessage);
        this.error = "An error ocurred"
        this.isLoading = false;
      }
    }
    )
    
    form.reset();
  }

  // 2- Error alert with html
  onHandleError() {
    this.error = null;
    this.inputFocused.nativeElement.focus();
  } 
  ngAfterViewInit() {
     this.inputFocused.nativeElement.focus();
  }

  ngOnDestroy(): void {
    // if(this.closeSub){
    //   this.closeSub.unsubscribe();
    // }
  }

  // Error alert programaticamente es decir que creo el html programaticamente
  // Aunque es una manera bastante engorrosa de crearlo. Es preferible crearlo con html y viewchild
  // private showErrorAlert(message: string) {
  //   // Crear una instancia del AlertComponent no funcionara para ello estan las inyecciones de dependencias
  //   // const alertComp = new AlertComponent();
  //   // ahora usamos la instancia de la inyeccion de dependencias pasando como argumento el componente que nos interesa
  //   const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
  //     AlertComponent
  //   );

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();

  //    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
  //    componentRef.instance.message = message;
  //    this.closeSub = componentRef.instance.close.subscribe( () => {
  //     this.closeSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //    });
  // }

   

}


