import React from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import {
  ContactsType,
  useDelContactMutation,
} from "../../../redux/reducers/http/httpReducer";
import { NavLink } from "react-router-dom";
import Modal from "../../modal/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchContact from "./Search";

const Friends = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const FriendsText = styled.h2`
  font-size: 18px;
  padding: 20px 0px 10px 0px;
  border-bottom: var(--block-border);
`;

const Friend = styled.p`
  font-size: 14px;
`;

const AvatarFriendBox = styled(NavLink)`
  display: flex;
  padding: 10px 0px;
  position: relative;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #ffffff95;
  }
`;

const AvatarFriend = styled.img`
  width: 30px;
  height: 30px;
`;

const Ul = styled.ul`
  height: calc(var(--hight-blok-noHeader) - 341px);
  overflow-y: scroll;
`;

const Li = styled.li`
  position: relative;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const ButtBoxs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
`;

const SearchBox = styled.div``;

const Contacts: React.FC<{
  contacts: ContactsType[] | undefined;
}> = ({ contacts }) => {
  const [get, set] = React.useState<boolean>(false);
  const [getid, setId] = React.useState<number>();
  const [setContact] = useDelContactMutation();

  const openHandler = (e: React.MouseEvent<HTMLElement>, id: number): void => {
    e.preventDefault();
    setId(id);
    set(true);
  };

  const deleteHandler = (id: number): void => {
    setContact({ id: id });
  };

  const clouseHandler = (): void => set(false);

  return (
    <Friends>
      <SearchBox>
        <FriendsText>Contacts</FriendsText>
        <SearchContact />
      </SearchBox>
      <Ul>
        {contacts?.map(({ id, contactId }) => (
          <Li key={id}>
            <AvatarFriendBox
              onContextMenu={(e) => openHandler(e, id)}
              to={`/:${contactId?.id}_${contactId?.firstName}_${contactId?.lastName}`}
            >
              <AvatarFriend src={avatar} alt="avatar" />
              <Friend>{`${contactId?.lastName} ${contactId?.firstName}`}</Friend>
            </AvatarFriendBox>
            <Modal
              bg={"#bc9979"}
              open={get}
              num={getid}
              n={id}
              clouseHandler={clouseHandler}
              component={
                <ButtBoxs>
                  <Butt onClick={clouseHandler}>
                    <HighlightOffIcon sx={{ fontSize: "20px" }} />
                  </Butt>
                  <Butt onClick={() => deleteHandler(id)}>
                    <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
                  </Butt>
                </ButtBoxs>
              }
            />
          </Li>
        ))}
      </Ul>
    </Friends>
  );
};

export default Contacts;
