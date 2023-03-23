import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
  
} from '@angular/animations';


@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css'],
  animations: [
    trigger('imgState', [
      state('normal', style({
        opacity: 0,
        width: '150px',
        
        transform: 'translateX(0px)'
      })),
      state('semi', style({
        opacity: 1,
        width: '300px',
        
        transform: 'translateX(100px)'
      })),
      transition('normal => semi', animate('0.5s')),
      transition('semi => normal', [ animate('0.5s')]),

    ]),
    trigger('btnMove',[
      state('normal', style({
       color: '#fff',
       width: '140px',
       background: '#00b894',  
       fontWeight: 'normal',
       borderColor:  '#00b894'
        
      })),
      state('moved', style({
        color: '#fff',
        width: '150px',
        background: '#00E1B5', 
        fontWeight: 'bold', 
        borderColor:  '#00E1B5'
        
      })),
      // transition('normal => moved', animate('0.2s')),
      // transition('normal => moved', animate("500ms 10ms ease-in-out") ),
      transition('moved <=> *', [ 
        style({
          'background': 'green'
        }),
        animate('500ms', style({
          'border-radius': '15px'
        })),
        animate('0.5s')
      ]),

    ])
  ]
})
export class RecipeStartComponent implements OnInit{
  state = 'normal';
  stateMove = 'normal';
  
  
  constructor(){}
 
 
  ngOnInit(): void {
    
  }
  onAnimate(){
    
    this.state == 'normal'  ? this.state = 'semi' : this.state = 'normal';
  }
  onMove(){
    this.stateMove = 'moved';
  }
  onLeaved() {
    this.stateMove = 'normal';
  }
 
}
