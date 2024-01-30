const SETDATA = "SET_DATA_MOREINF__EHD34755$$_Rki_999_1566";
const DELDATA = "Del_DATA_MOREINF__EHw5$$_Rkiw566_322JHTFD_ll";

export interface TypeAction {
  type: typeof SETDATA | typeof DELDATA;
  id: number;
}

export interface InitialStateType {
  id: number | null;
  open: boolean;
}

const initialState: InitialStateType = { id: null, open: false };

const moreInfReducer = (
  state = initialState,
  action: TypeAction
): InitialStateType => {
  switch (action.type) {
    case SETDATA:
      return { id: action.id, open: true };
    case DELDATA:
      return { ...initialState };
    default:
      return state;
  }
};

export const setDataMoreInfAction = (id: number) => ({
  type: SETDATA,
  id,
});

export const delDataMoreInfAction = () => ({
  type: DELDATA,
});

export default moreInfReducer;
