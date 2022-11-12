import {IState} from "./reducer"

export type Action = { type: "player1/setPlayer1"; payload: IState };

export const setPlayers = (data:any): Action => ({
  type: "player1/setPlayer1",
  payload: data,
});
