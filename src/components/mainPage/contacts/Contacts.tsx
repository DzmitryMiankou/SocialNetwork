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
import Avatar from "../../avatar/Avatar";
import SearchInput from "../../searchInput/SearchInput";

const Friends = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const FriendsText = styled.h2`
  font-size: 18px;
  padding: 20px 0px 10px 0px;
`;

const Friend = styled.p`
  font-size: 14px;
`;

const AvatarFriendBox = styled(NavLink)`
  position: relative;
  display: flex;
  padding: 10px 0px;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: linear-gradient(
      90deg,
      rgba(63, 94, 251, 0) 1%,
      rgba(255, 255, 255, 0.3) 71%
    );
  }
`;

const AvatarFriend = styled.img`
  width: 30px;
  height: 30px;
`;

const Ul = styled.ul`
  height: calc(var(--hight-blok-noHeader) - 316px);
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

const SearchBox = styled.div`
  width: fit-content;
`;

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
        <SearchInput />
      </SearchBox>
      <Ul>
        {contacts?.map(({ id, contactId }) => (
          <Li key={id}>
            <AvatarFriendBox
              onContextMenu={(e) => openHandler(e, id)}
              to={`/:${contactId?.id}_${contactId?.firstName}_${contactId?.lastName}`}
            >
              <>
                {(
                  <Avatar
                    size={30}
                    letter={contactId?.firstName[0]}
                    fontSize={20}
                  />
                ) ?? <AvatarFriend src={avatar} alt="avatar" />}
              </>
              <Friend>{`${contactId?.firstName} ${contactId?.lastName}`}</Friend>
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
