const SETDATA = "SET_DATA_EWSGR__EHD343dfbtr$$_RF_1514";
const LOGAUT = "LOGAUT_EWSgt%#GR_343d44-%$#fbtr$$_RF_1514";

interface User<N, S> {
  id: N;
  firstName: S;
  lastName: S;
  email: S;
  access_token?: S;
}

export interface InitialStateType {
  user: User<number | null, string | null>;
  token: null | string;
  isActive: boolean;
}

export interface TypeAction {
  type: typeof SETDATA | typeof LOGAUT;
  value: User<number, string>;
}

const initialState: InitialStateType = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    access_token: null,
  },
  token: null,
  isActive: false,
};

const loginReducer = (
  state = initialState,
  action: TypeAction
): InitialStateType | {} => {
  switch (action.type) {
    case SETDATA: {
      if (action.value) {
        const newData = { ...action.value };
        delete newData["access_token"];
        return {
          ...state,
          token: action.value.access_token ?? null,
          user: "id" in action.value ? { ...newData } : { ...state.user },
          isActive: "access_token" in action.value ? true : false,
        };
      }
      return { ...state, isActive: false };
    }
    case LOGAUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const setDataAction = (value: User<number, string> | {}) => ({
  type: SETDATA,
  value,
});

export const logOutAction = () => ({
  type: LOGAUT,
});

export default loginReducer;
