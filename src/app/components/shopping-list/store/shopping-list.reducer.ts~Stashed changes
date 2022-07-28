import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../../models/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIdx: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIdx: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIdx];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIdx] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIdx: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients
          .filter((ingr, ingrIndex) => {
            return ingrIndex !== state.editedIngredientIdx;
          }),
        editedIngredientIdx: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredient: { ...state.ingredients[action.payload] },
        editedIngredientIdx: action.payload,
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIdx: -1,
      };
    default:
      return state;
  }
}
