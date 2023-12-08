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

const Form = () => {
  return (
    <FormBox>
      <InoutBox>
        <label htmlFor="firstName">First name:</label>
        <input id="firstName" name="firstName" type="text" />
      </InoutBox>
      <InoutBox>
        <label htmlFor="lastName">Last name:</label>
        <input id="lastName" name="lastName" type="text" />
      </InoutBox>
      <InoutBox>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="text" />
      </InoutBox>
      <button type="button">Registration</button>
    </FormBox>
  );
};

export default Form;
