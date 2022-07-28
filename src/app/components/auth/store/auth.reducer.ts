import { User } from "../../../models/user.model";
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: any;
  loading?: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
}

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
      }
    case AuthActions.LOGIN_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.tokenExpirationDate,
        action.payload.token,
      );
      console.log(user)
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
      }
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }
}
