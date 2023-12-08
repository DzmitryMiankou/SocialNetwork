import React from "react";
import styled from "styled-components";

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 5px;
`;

const InoutBox = styled.div`
  display: flex;
  flex-direction: column;
`;

interface FurmValue<T extends string> {
  firstName: T;
  lastName: T;
  password: T;
  email: T;
}

const Form = () => {
  const [formValue, setFormValue] = React.useState<FurmValue<string>>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
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

  return (
    <FormBox>
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
          <InoutBox key={label}>
            <label htmlFor={idName}>{label}</label>
            <input
              id={idName}
              name={idName}
              type={type}
              onChange={handleRadioChange}
              value={value}
            />
          </InoutBox>
        ))}
      </>
      <button type="button">Registration</button>
    </FormBox>
  );
};

export default Form;
