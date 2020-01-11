import { CHANGE_THEME } from "./ActionType";

export const changeThemeAction = (index) => {
  
  return {
    type: CHANGE_THEME,
    payload: index,
  }
}