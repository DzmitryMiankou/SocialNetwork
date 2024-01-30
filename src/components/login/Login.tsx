import React from "react";
import styled from "styled-components";
import { useAuthUserMutation } from "../../redux/api/http/httpReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginActions } from "../../redux/localState/loginReducer";
import { Link, useNavigate } from "react-router-dom";

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

const Nav = styled(Link)`
  color: black;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [post] = useAuthUserMutation();
  const [value, setValue] = React.useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const handlerClick = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    const data = await post({
      email: value.email,
      password: value.password,
    });
    if ("data" in data) dispatch(loginActions.setDataAction(data.data));
    navigate("/");
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

  return (
    <FormBox method="post" id="login">
      <h1>SIGN IN MYLINE</h1>
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
        sign in
      </button>
      <Nav to="/auth">registration</Nav>
    </FormBox>
  );
};

export default Login;
