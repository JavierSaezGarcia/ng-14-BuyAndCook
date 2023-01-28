import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('Arroz al Horno Valenciano','Receta de arroz donde las haya. Sencilla de realizar y exquisita de degustar.',
    'https://www.villacedeira.com/wp-content/uploads/2018/10/arroz-al-horno-valenciano.jpg'),
    new Recipe('Chipirones encebollados','Existe una receta que apuesta por la cebolla como principal acompañante',
    'https://ep01.epimg.net/elcomidista/imagenes/2022/02/28/receta/1646061489_765186_1646062631_media_normal_recorte2.jpg'),
    new Recipe('Pimientos rojos rellenos de arroz','Hacer esta receta siempre me evoca recuerdos de cuando era un niño y mi abuela hacía 8 ó 9 para toda la familia. ',
    'http://1.bp.blogspot.com/-DoHoCNJ48Ww/Tyo0ZNCy6JI/AAAAAAAACVI/gQabCI76QS4/s1600/pimientos+rellenos+de+arroz+y+carneeee+.jpg')
  ];
  
  

}
