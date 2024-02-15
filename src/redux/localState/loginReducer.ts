const SETDATA = "SET_DATA_EWSGR__EHD343dfbtr$$_RF_1514";
const LOGAUT = "LOGAUT_EWSgt%#GR_343d44-%$#fbtr$$_RF_1514";
const UPDATA = "UPGAUT_(((rr_}RSgt%#FFFFGR%$#fbtrjyumi_rtbr";

type Nullable<T> = null | T;
export type LogInitialStateType = typeof initialState;
type TypeAction = ReturnType<ActionType<typeof loginActions>>;
type ActionType<T> = T extends { [key: string]: infer V } ? V : never;

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
          token: action.value?.access_token || null,
          user: "id" in action.value ? { ...newData } : { ...state.user },
          isActive: "access_token" in action.value ? true : false,
        };
      }
      return { ...state, isActive: false };
    }
    case UPDATA: {
      return { ...state, token: action.value.access_token };
    }
    case LOGAUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const loginActions = {
  setDataAction: (value: LogInitialStateType["user"]) =>
    ({
      type: SETDATA,
      value,
    } as const),
  upTokenAction: (value: { access_token: string }) => {
    console.log(value);
    return {
      type: UPDATA,
      value,
    } as const;
  },
  logOutAction: () =>
    ({
      type: LOGAUT,
    } as const),
};

export default loginReducer;
