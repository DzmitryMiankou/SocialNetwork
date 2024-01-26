import React, { useState } from "react";
import styled from "styled-components";
import avatar from "../../../img/images.png";
import {
  ContactsType,
  useDelContactMutation,
} from "../../../redux/reducers/http/httpReducer";
import { NavLink } from "react-router-dom";
import Modal from "../../alert/Alert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "../../avatar/Avatar";
import SearchInput from "../../searchInput/SearchInput";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { setDataMoreInfAction } from "../../../redux/moreInfReducer";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import { SxProps } from "@mui/material";

const Friends = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const FriendsText = styled.h3`
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
  height: calc(var(--hight-blok-noHeader) - 360px);
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

const SX: { icon: SxProps } = {
  icon: {
    fontSize: "20px",
    transition: "0.2s",
    "&:hover": {
      color: "#ffffff",
    },
  },
};

const Contacts: React.FC<{
  contacts: ContactsType[] | undefined;
}> = ({ contacts }) => {
  const [get, set] = useState<boolean>(false);
  const [getid, setId] = useState<number>();
  const [setContact] = useDelContactMutation();
  const [value, setValue] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const openHandler = (e: React.MouseEvent<HTMLElement>, id: number): void => {
    e.preventDefault();
    setId(id);
    set(true);
  };

  const clouseHandler = (): void => {
    setValue("");
    set(false);
  };

  const deleteHandler = (id: number): void => {
    setContact({ id: id });
  };

  const getAllInfUser = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ): void => {
    e.preventDefault();
    dispatch(setDataMoreInfAction(id));
  };

  const filterContacts = (): ContactsType[] | void => {
    if (value.trim().length >= 1) {
      const contact = contacts?.filter((el) =>
        (el.contact.firstName + el.contact.lastName)
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(value.replaceAll(" ", "").toLowerCase())
      );
      if (contact === undefined) return;
      return contact;
    }
    if (contacts === undefined) return;
    return contacts;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    filterContacts();
  };

  return (
    <Friends>
      <SearchBox>
        <FriendsText>Contacts</FriendsText>
        <SearchInput
          handleChange={handleChange}
          value={value}
          clouseHandler={clouseHandler}
          bg="rgba(138, 90, 45, 0.454)"
          colorPl="#e1b47d"
        />
      </SearchBox>
      <Ul>
        {filterContacts()?.map(({ id, contact }) => (
          <Li key={id}>
            <AvatarFriendBox
              onContextMenu={(e) => openHandler(e, id)}
              to={`/:${contact?.id}_${contact?.firstName}_${contact?.lastName}`}
            >
              <>
                {(
                  <Avatar
                    size={30}
                    letter={contact?.firstName[0] + contact?.lastName[0]}
                    fontSize={16}
                  />
                ) ?? <AvatarFriend src={avatar} alt="avatar" />}
              </>
              <Friend>{`${contact?.firstName} ${contact?.lastName}`}</Friend>
            </AvatarFriendBox>
            <Modal
              bg={"#bc9979"}
              open={get}
              num={getid}
              n={id}
              clouseHandler={clouseHandler}
              component={
                <ButtBoxs>
                  <Butt onClick={(e) => getAllInfUser(e, contact?.id)}>
                    <LocalLibraryOutlinedIcon sx={SX.icon} />
                  </Butt>
                  <Butt onClick={() => deleteHandler(id)}>
                    <DeleteOutlineIcon sx={SX.icon} />
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
