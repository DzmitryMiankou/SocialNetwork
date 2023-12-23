import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SxProps, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const PosterBox = styled.div`
  display: grid;
  height: calc(100vh - 62px);
  grid-template-rows: 50px 1fr auto;
`;

const Header = styled.div`
  padding: 10px 40px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const SendBox = styled.div`
  width: 100%;
  position: relative;
`;

const SX: { textArea: SxProps } = {
  textArea: {
    background: "#ffe2c6",
    padding: "10px 60px 0px 30px",
    width: "calc(100% - 80px)",
  },
};

const ButtSend = styled(Butt)`
  background-color: #cead8d;
  border: none;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  transition: 0.1s;
  height: 43px;
  &:hover {
    background: #d0b9a3;
  }
`;

const ButtSend2 = styled(ButtSend)`
  left: 0;
  background-color: transparent;
  width: 30px;
  height: 34px;
  &:hover {
    background-color: transparent;
  }
`;

const Messages: React.FC = () => {
  return (
    <PosterBox>
      <Header>
        <h3>Name</h3>
        <Butt type="button">
          <MoreVertIcon sx={{ fontSize: "28px" }} />
        </Butt>
      </Header>
      <div style={{ padding: "10px 40px 0px 20px" }}>
        Nest (NestJS) is a framework for building efficient, scalable Node.js
        server-side applications. It uses progressive JavaScript, is built with
        and fully supports TypeScript (yet still enables developers to code in
        pure JavaScript) and combines elements of OOP (Object Oriented
        Programming), FP (Functional Programming), and FRP (Functional Reactive
        Programming). Under the hood, Nest makes use of robust HTTP Server
        frameworks like Express (the default) and optionally can be configured
        to use Fastify as well! Nest provides a level of abstraction above these
        common Node.js frameworks (Express/Fastify), but also exposes their APIs
        directly to the developer. This gives developers the freedom to use the
        myriad of third-party modules which are available for the underlying
        platform.
      </div>
      <SendBox>
        <TextField
          id="standard-textarea"
          maxRows={10}
          placeholder="send a message"
          variant="standard"
          color="warning"
          sx={SX.textArea}
        />
        <ButtSend>
          <SendIcon />
        </ButtSend>
        <ButtSend2>
          <AttachFileIcon />
        </ButtSend2>
      </SendBox>
    </PosterBox>
  );
};

export default Messages;
