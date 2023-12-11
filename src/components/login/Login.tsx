import React from "react";
import styled from "styled-components";

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 80%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login: React.FC = () => {
  return (
    <FormBox method="post" id="login">
      {[
        {
          label: "Email:",
          idName: "email",
          type: "email",
        },
        {
          label: "Password:",
          idName: "password",
          type: "password",
        },
      ].map(({ label, idName, type }) => (
        <React.Fragment key={idName}>
          <InputBox>
            <label htmlFor={idName}>{label}</label>
            <input name={idName} type={type} />
          </InputBox>
        </React.Fragment>
      ))}
    </FormBox>
  );
};

export default Login;
