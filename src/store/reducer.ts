import * as actionTypes from "./actions";

export interface ingrType {
  [ing: string]: number;
}

export interface burgerBuilderState {
  ingredients: ingrType;
  totalPrice: number;
  purchaseable: boolean;
}

export interface actionType {
  type: string;
  payload: string;
}

export interface reRenderActionType {
  type: string;
}

const INGREDIENT_PRICES: { [key: string]: number } = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState: burgerBuilderState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 4,
  purchaseable: false,
};

export const burgerBuilderReducer = (
  state = initialState,
  action: actionType
): burgerBuilderState => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIng = { ...state.ingredients };
      const oldValue = updatedIng[action.payload];
      updatedIng[action.payload] = oldValue + 1;
      return {
        ...state,
        ingredients: updatedIng,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (state.ingredients[action.payload] === 0) return state;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
      };
    case actionTypes.RERENDER_INGREDIENTS:
      return initialState;
    default:
      return state;
  }
};
