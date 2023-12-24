import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
  display: flex;
  align-items: center;
`;

const ButtSend = styled(Butt)`
  background-color: #cead8d;
  border: none;
  width: 60px;
  transition: 0.1s;
  height: 100%;
  &:hover {
    background: #d0b9a3;
  }
`;

const ButtSend2 = styled(ButtSend)`
  display: flex;
  height: auto;
  padding: 6px;
  width: auto;
  background-color: transparent;
  &:hover {
    background-color: transparent;
  }
`;

const TextA = styled.textarea`
  letter-spacing: inherit;
  resize: none;
  width: 100%;
  height: 100%;
  outline: none;
  background: #ffe7d0;
  border: none;
  overflow: auto;
  border-left: 1px solid black;
  padding: 0px 5px;
`;

const Div = styled.div`
  background: #ffe7d0;
  height: 100%;
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
      <div
        style={{
          padding: "10px 40px 0px 20px",
          borderBottom: "1px solid black",
        }}
      >
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
        <Div>
          <ButtSend2>
            <AttachFileIcon />
          </ButtSend2>
          <ButtSend2>
            <HighlightOffIcon />
          </ButtSend2>
        </Div>
        <TextA placeholder="send a message" rows={6}></TextA>
        <Div>
          <ButtSend>
            <SendIcon />
          </ButtSend>
        </Div>
      </SendBox>
    </PosterBox>
  );
};

export default Messages;
