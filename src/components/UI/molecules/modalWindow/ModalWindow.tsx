import React from "react";
import styled from "styled-components";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { SxProps } from "@mui/material";
import { useNewContactMutation } from "../../../../redux/api/http/httpReducer";
import useClouseClickOut from "../../../../hooks/useClouseClickOut";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { setDataMoreInfAction } from "../../../../redux/localState/moreInfReducer";

const ModalBox = styled.div`
  position: absolute;
  right: 10px;
  background-color: white;
  top: 30px;
  min-width: 200px;
  width: 20vw;
  z-index: 44;
`;

const UserBox = styled.li`
  border-bottom: #00000034 solid 1px;
  transition: 0.2s;
  &:hover {
    background-color: #fff8f3;
  }
`;
const UserLink = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
  text-decoration: none;
  color: black;
`;

const ButtBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: flex;
  gap: 10px;
  border: none;
  background: transparent;
`;

const SX: { button: SxProps } = {
  button: {
    transition: "0.2s",
    fontSize: "20px",
    ":hover": { color: "#df7714" },
  },
};

const MoadalWindow: React.FC<{
  data: { id: number; firstName: string; lastName: string }[] | undefined;
  moreInf: { id: number | null; open: boolean };
  clouseHandler: () => void;
}> = ({ data, clouseHandler, moreInf }) => {
  const [setContact] = useNewContactMutation();
  const [open, setopen] = React.useState<number | "">("");
  const { ref } = useClouseClickOut({ clouseHandler });
  const dispatch: AppDispatch = useDispatch();

  const setNewContact = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.preventDefault();
    setContact({ id: id });
  };

  const getAllInfUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.preventDefault();
    dispatch(setDataMoreInfAction(id));
  };

  return (
    <ModalBox ref={!moreInf.id ? ref : null}>
      <ul>
        {data?.map(({ id, lastName, firstName }) => (
          <UserBox
            key={id}
            onMouseEnter={() => setopen(id)}
            onMouseLeave={() => setopen("")}
          >
            <UserLink>
              <p>{`${firstName} ${lastName}`}</p>
              <ButtBox>
                {[
                  <LocalLibraryIcon sx={SX.button} />,
                  <PersonAddIcon sx={SX.button} />,
                ].map((data, i) => (
                  <React.Fragment key={`button_header_${i}`}>
                    {open === id && (
                      <Button
                        onClick={(e) =>
                          i === 1 ? setNewContact(e, id) : getAllInfUser(e, id)
                        }
                      >
                        {data}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </ButtBox>
            </UserLink>
          </UserBox>
        ))}
      </ul>
    </ModalBox>
  );
};

export default MoadalWindow;
