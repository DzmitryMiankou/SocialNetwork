import React, { useState } from "react";
import styled from "styled-components";
import {
  ContactsType,
  useDelContactMutation,
} from "../../../../redux/api/http/httpReducer";
import SearchInput from "../../molecules/SearchInput/SearchInput";
import { AppDispatch } from "../../../../redux/store";
import { useDispatch } from "react-redux";
import { setDataMoreInfAction } from "../../../../redux/localState/moreInfReducer";
import TitleBlock from "../../atoms/TitleBlock/TitleBlock";
import LinkUsers from "../../molecules/LinkUsers/LinkUsers";
import ContextMenu from "../../molecules/ContextMenu/ContextMenu";
import Buttons from "../../atoms/Buttons/Buttons";

const Friends = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const Ul = styled.ul`
  height: calc(var(--hight-blok-noHeader) - 360px);
  overflow-y: scroll;
`;

const Li = styled.li`
  position: relative;
  overflow-x: hidden;
`;

const SearchBox = styled.div`
  width: fit-content;
`;

const Contacts: React.FC<{
  contacts: ContactsType[] | undefined;
}> = ({ contacts }) => {
  const [getid, setId] = useState<number>();
  const [setContact] = useDelContactMutation();
  const [value, setValue] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const openHandler = (e: React.MouseEvent<HTMLElement>, id: number): void => {
    e.preventDefault();
    setId(id);
  };

  const clouseHandler = (): void => {
    setId(0);
    setValue("");
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
        <TitleBlock text="Contacts" />
        <SearchInput
          handleChange={handleChange}
          value={value}
          clouseHandler={clouseHandler}
          bg="rgba(138, 90, 45, 0.454)"
          colorPl="#e1b47d"
        />
      </SearchBox>
      <Ul>
        {filterContacts()?.map(({ id, contact }, i) => (
          <Li key={id} onContextMenu={(e) => openHandler(e, id)}>
            <LinkUsers
              gridArea={`'ava dial'
                         'ava dial'`}
              countEl={2}
              title={`${contact?.firstName} ${contact?.lastName}`}
              sizeImg={30}
              open={id === getid}
              fontSize={16}
              letter={contact?.firstName[0] + contact?.lastName[0]}
              to={`/:${contact?.id}_${contact?.firstName}_${contact?.lastName}`}
            />
            <ContextMenu
              clouseHandler={clouseHandler}
              user={id ?? 0}
              open={id === getid ? getid : 0}
              arrayChild={[
                Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                  getAllInfUser(e, contact?.id)
                ).LocalLibrary,
                Buttons((e: React.MouseEvent<HTMLButtonElement>) =>
                  deleteHandler(id)
                ).DeleteOutline,
              ]}
            />
          </Li>
        ))}
      </Ul>
    </Friends>
  );
};

export default Contacts;
