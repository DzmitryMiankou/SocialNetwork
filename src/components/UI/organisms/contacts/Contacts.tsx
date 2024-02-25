import React, { useState } from "react";
import { St } from "./Contacts.style";
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

const filterContacts = (
  value: string,
  contacts: ContactsType[]
): ContactsType[] => {
  if (value.trim().length >= 1) {
    const contact = contacts?.filter((el) =>
      (el.contact.firstName + el.contact.lastName)
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(value.replaceAll(" ", "").toLowerCase())
    );
    return contact;
  }
  return contacts;
};

const Contacts: React.FC<{
  contacts: ContactsType[] | undefined;
}> = ({ contacts = [] }) => {
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
    filterContacts(value, contacts);
  };

  return (
    <St.Friends>
      <St.SearchBox>
        <TitleBlock text="Contacts" />
        <SearchInput
          handleChange={handleChange}
          value={value}
          clouseHandler={clouseHandler}
          bg="rgba(138, 90, 45, 0.454)"
          colorPl="#e1b47d"
        />
      </St.SearchBox>
      <St.Ul>
        {filterContacts(value, contacts)?.map(({ id, contact }, i) => (
          <St.Li key={id} onContextMenu={(e) => openHandler(e, id)}>
            <LinkUsers
              style={{
                gridColumns: "40px auto",
                padding: "10px 0px",
                fontSize: 16,
                sizeImg: 30,
                gridArea: `'ava dial'
                         'ava dial'`,
              }}
              countEl={2}
              title={`${contact?.firstName} ${contact?.lastName}`}
              open={id === getid}
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
          </St.Li>
        ))}
      </St.Ul>
    </St.Friends>
  );
};

export default Contacts;
