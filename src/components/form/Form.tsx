import React from "react";
import styled from "styled-components";
import { useRegUserMutation } from "../../redux/reducers/http/httpReducer";
import { Link } from "react-router-dom";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 80%;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  height: 30px;
`;

const Message = styled.div<{ $color: string }>`
  height: 30px;
  color: ${(prop) => prop.$color};
`;

interface FurmValue<T extends string> {
  firstName: T;
  lastName: T;
  password: T;
  email: T;
}

const Nav = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
  color: black;
  transition: 0.2s;
  &:hover {
    color: var(--red-color);
  }
  &.active {
    color: var(--red-color);
    cursor: default;
  }
`;

const Form: React.FC = () => {
  const [regUser, data] = useRegUserMutation() as any;
  const [formValue, setFormValue] = React.useState<FurmValue<string>>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [messages, setMessages] = React.useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    setMessages("");
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "firstName":
        setFormValue(() => ({ ...formValue, firstName: target.value }));
        break;
      case "lastName":
        setFormValue(() => ({ ...formValue, lastName: target.value }));
        break;
      case "email":
        setFormValue(() => ({ ...formValue, email: target.value }));
        break;
      case "password":
        setFormValue(() => ({ ...formValue, password: target.value }));
        break;
      default:
        break;
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    if (
      formValue.email === "" ||
      formValue.password === "" ||
      formValue.firstName === "" ||
      formValue.lastName === ""
    )
      return setMessages("please fill all fields");

    if (
      /^[A-ZА-ЯЁ]+$/i.test(formValue.firstName) !== true ||
      formValue.firstName.length < 2
    )
      return setMessages("wrong name");

    if (
      /^[A-ZА-ЯЁ]+$/i.test(formValue.lastName) !== true ||
      formValue.lastName.length < 2
    )
      return setMessages("wrong lastname");

    if (
      /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(formValue.email) !==
        true ||
      formValue.email.length < 8
    )
      return setMessages("wrong email");

    if (
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formValue.password) !== true
    )
      return setMessages("easy password");

    await regUser({
      ...formValue,
    });

    /* const responseStr: string = await response.json();
    if (responseStr === "ER_DUP_ENTRY")
      return setMessages("email address already exists");
    if (response.ok) return setMessages("ok. open your mail");*/
  };

  return (
    <Box>
      <FormBox method="post" id="reg">
        <>
          {[
            {
              label: "First name:",
              idName: "firstName",
              type: "text",
              value: formValue.firstName,
            },
            {
              label: "Last name:",
              idName: "lastName",
              type: "text",
              value: formValue.lastName,
            },
            {
              label: "Email:",
              idName: "email",
              type: "email",
              value: formValue.email,
            },
            {
              label: "Password:",
              idName: "password",
              type: "password",
              value: formValue.password,
            },
          ].map(({ label, idName, type, value }) => (
            <InputBox key={label}>
              <label htmlFor={idName}>{label}</label>
              <input
                id={idName}
                name={idName}
                type={type}
                onChange={handleInputChange}
                value={value}
              />
            </InputBox>
          ))}
        </>
      </FormBox>
      <button type="submit" form="reg" onClick={(e) => handleClick(e)}>
        Registration
      </button>
      <MessageBox>
        {data?.error?.data !== "ok. open your mail" ? (
          <Message
            $color={messages !== "ok. open your mail" ? "#b50000" : "#00821a"}
          >
            {data?.error?.data}
          </Message>
        ) : (
          <></>
        )}
      </MessageBox>
      <Nav to="/sign">Sign</Nav>
    </Box>
  );
};

export default Form;
