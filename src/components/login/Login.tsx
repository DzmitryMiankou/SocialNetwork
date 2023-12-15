import React from "react";
import styled from "styled-components";
import { useAuthUserMutation } from "../../redux/reducers/http/httpReducer";

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
  const [post, result] = useAuthUserMutation();
  const [value, setValue] = React.useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const handlerClick = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    await post({
      email: value.email,
      password: value.password,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    switch (target.name) {
      case "email":
        setValue(() => ({ ...value, email: target.value }));
        break;
      case "password":
        setValue(() => ({ ...value, password: target.value }));
        break;
      default:
        break;
    }
  };

  console.log(result?.data);

  return (
    <FormBox method="post" id="login">
      {[
        {
          label: "Email:",
          idName: "email",
          type: "email",
          value: value.email,
        },
        {
          label: "Password:",
          idName: "password",
          type: "password",
          value: value.password,
        },
      ].map(({ label, idName, type, value }) => (
        <React.Fragment key={idName}>
          <InputBox>
            <label htmlFor={idName}>{label}</label>
            <input
              value={value}
              name={idName}
              type={type}
              onChange={handleInputChange}
            />
          </InputBox>
        </React.Fragment>
      ))}
      <button type={"button"} onClick={handlerClick}>
        sign
      </button>
    </FormBox>
  );
};

export default Login;
