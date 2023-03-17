
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

export interface AppState {
    shoppingList: State
}

const initialState = {
    ingredients: [
        // new Ingredient( 'Arroz', 500 ,'gr'),
        // new Ingredient( 'Tomate', 400 , 'gr')
    ],  
    editedIngredient: null, 
    editedIngredientIndex: -1
}

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions
    ) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ ...state.ingredients, action.payload ]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredients = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredients,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient ;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };


        case ShoppingListActions.DELETE_INGREDIENT:

            return {
                ...state,
                ingredients: state.ingredients.filter( (ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                })
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}

            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
    
   
}