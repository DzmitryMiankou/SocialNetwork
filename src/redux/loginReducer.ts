const SETDATA = "SET_DATA_EWSGR__EHD343dfbtr$$_RF_1514";
const LOGAUT = "LOGAUT_EWSgt%#GR_343d44-%$#fbtr$$_RF_1514";

export interface InitialStateType {
  user:
    | {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        access_token: string;
      }
    | { access_token?: string };
  token: null | string;
  isActive: boolean;
}

interface TypeAction {
  type: typeof SETDATA | typeof LOGAUT;
  value: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    access_token?: string;
  };
}

const initialState: InitialStateType = {
  user: {},
  token: null,
  isActive: false,
};

const loginReducer = (state = initialState, action: TypeAction) => {
  switch (action.type) {
    case SETDATA: {
      if (action.value) {
        const newData = { ...action.value };
        delete newData["access_token"];
        return {
          ...state,
          token: action.value.access_token,
          user: "id" in action.value ? { ...newData } : { ...state.user },
          isActive: true,
        };
      }
      return { ...state };
    }
    case LOGAUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const setDataAction = (
  value:
    | {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        access_token: string;
      }
    | {}
    | undefined
) => ({
  type: SETDATA,
  value,
});

export const logAutAction = () => ({
  type: LOGAUT,
});

export default loginReducer;
