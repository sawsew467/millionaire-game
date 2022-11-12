import { Action } from "./actions";

export interface IState {
  player: {
    id: number;
    name: string;
    answers: string | number[];
    times: number[];
  };
}

const initialState = {
  player1: {
    id: 1,
    name: "",
    answers: [],
    times: [],
  },
  player2: {
    id: 2,
    name: "",
    answers: [],
    times: [],
  },
};

export const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "player1/setPlayer1": {
      return { ...state, 123: action.payload };
    }
    default:
      return state;
  }
};
