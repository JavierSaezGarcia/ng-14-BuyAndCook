import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  titles: string[] = ['Arroz al Horno','Chipirones encebollados','Pimientos rellenos de arroz'];
  comentaries: string[] = [
    'Arroz auténtico valenciano hecho de la misma forma desde hace 100 años. \n',
    'Existe una receta que apuesta por la cebolla como principal acompañante',
    'Hacer esta receta siempre me evoca recuerdos de cuando era un niño y mi abuela hacía 8 ó 9 para toda la familia. '
  ]

  constructor(private shoppingListService: ShoppingListService) {};

  private recipes: Recipe[] = [
    new Recipe(
    this.titles[0],
    this.comentaries[0]+'Preparación, cómo hacer arroz al horno valenciano:  '+'\n'+
    '1.- Corta las lonchas de panceta en tiras.\n\n'+
    '2.- Pon la paellera a fuego medio con un poco de aceite de oliva, '+
    'y cuando esté caliente incorpora la panceta junto con las costillas de cerdo y un poco de sal,'+
    ' y deja que se cocinen y doren, tardarán entre 5 y 10 minutos. '+
    'Retíralas de la paellera con una espumadera para dejar ahí el aceite y la grasa que ha quedado, y cocinar en ella la patata. \n\n'+
    '3.- Pela la patata y córtala en rodajas, y dórala en la sartén por ambos lados, en 5 minutos las tendrás listas. Reserva. \n\n'+
    '4.- Precalienta el horno a 250ºC, con ventilador y resistencia de arriba y abajo a ser posible. \n\n'+
    '5.- Pon el caldo a calentar en un cazo, ya que deberemos añadirlo a la paellera cuando esté casi hirviendo. \n\n'+
    '6.- Ahora pon en la paellera el arroz junto con los garbanzos, las costillas, la panceta y las hojas de laurel y las ramitas de tomillo y romero.'+ 
    ' Revuélvelo todo bien y deja que se cocine 5 minutos, para que el arroz se empape del sabor que han ido dejando en la paellera el resto de ingredientes.'+
    ' Añade un poco de sal.  \n\n'+
    '7.- Ahora coloca por encima de forma graciosa las rodajas de patata, y también las morcillas. '+
    ' (puedes trocearlas un poco para distribuirlas mejor), el tomate en rodajas y la cabeza de ajos en el centro  \n\n'+
    '8.- Echa en el caldo caliente el azafrán o colorante alimentario, viértelo por toda la paellera e introdúcela en el horno que deberá estar ya a 250ºC.  \n\n'+
    '9.- Deja que se cocine 20 minutos. Al cabo de ese tiempo saca la paellera y déjala reposar al menos 5 minutos tapada con un paño o con papel de aluminio para que termine de cocinarse adecuadamente.'
    ,
    'https://www.villacedeira.com/wp-content/uploads/2018/10/arroz-al-horno-valenciano.jpg',
    [
      new Ingredient('Arroz', 500, 'gr'),
      new Ingredient('Morcilla', 1, 'un')

    ]),
    new Recipe(this.titles[1],
      this.comentaries[1],
    'https://ep01.epimg.net/elcomidista/imagenes/2022/02/28/receta/1646061489_765186_1646062631_media_normal_recorte2.jpg',
    [
      new Ingredient('Chipirones', 1000, 'gr'),
      new Ingredient('Cebolla', 3, 'un')

    ]),
    new Recipe(this.titles[2],
      this.comentaries[2],
    'http://1.bp.blogspot.com/-DoHoCNJ48Ww/Tyo0ZNCy6JI/AAAAAAAACVI/gQabCI76QS4/s1600/pimientos+rellenos+de+arroz+y+carneeee+.jpg',
    [
      new Ingredient('Pimientos', 1500, 'gr'),
      new Ingredient('Magro', 500, 'gr')

    ])
  ]; 

  getRecipes(){
    // Creo un array copia de recipes para no modificar el original
    // aunque funciona si quitamos el slice()
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  getRecipeById(id: number){
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next( this.recipes.slice());   

  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index]= newRecipe;
    this.recipesChanged.next( this.recipes.slice());    
  }
  deleteRecipe(index: number) {
    
    this.recipes.splice(index, 1);    
    this.recipesChanged.next( this.recipes.slice());   
  }
}
