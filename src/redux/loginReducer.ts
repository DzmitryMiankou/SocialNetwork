const SETDATA = "SET_DATA_EWSGR__EHD343dfbtr$$_RF_1514";
const LOGAUT = "LOGAUT_EWSgt%#GR_343d44-%$#fbtr$$_RF_1514";
const UPDATA = "UPGAUT_(((rr_}RSgt%#FFFFGR%$#fbtrjyumi_rtbr";

type Nullable<T> = null | T;

const initialState = {
  user: {
    id: null as Nullable<number>,
    firstName: null as Nullable<string>,
    lastName: null as Nullable<string>,
    email: null as Nullable<string>,
    access_token: null as Nullable<string> | undefined,
  },
  token: null as Nullable<string>,
  isActive: false,
};

export type LogInitialStateType = typeof initialState;

export type TypeAction =
  | ReturnType<typeof setDataAction>
  | ReturnType<typeof logOutAction>
  | ReturnType<typeof upTokenAction>;

const loginReducer = (
  state: LogInitialStateType = initialState,
  action: TypeAction
): LogInitialStateType => {
  switch (action.type) {
    case SETDATA: {
      if (action.value) {
        const newData = { ...action.value };
        delete newData["access_token"];
        return {
          token: action.value?.access_token ?? null,
          user: "id" in action.value ? { ...newData } : { ...state.user },
          isActive: "access_token" in action.value ? true : false,
        };
      }
      return { ...state, isActive: false };
    }
    case LOGAUT: {
      return { ...initialState };
    }
    case UPDATA: {
      return { ...state, token: action.value.access_token };
    }
    default:
      return state;
  }
};

export const setDataAction = (value: LogInitialStateType["user"]) =>
  ({
    type: SETDATA,
    value,
  } as const);

export const upTokenAction = (value: { access_token: string }) =>
  ({
    type: UPDATA,
    value,
  } as const);

export const logOutAction = () =>
  ({
    type: LOGAUT,
  } as const);

export default loginReducer;
