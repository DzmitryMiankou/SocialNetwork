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
  max-height: 200px;
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

const MessagesBox = styled.div`
  padding: 10px 40px 0px 20px;
  border-bottom: 1px solid black;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Message = styled.div`
  background-color: #fff0dd;
  padding: 5px 10px;
  width: fit-content;
  min-width: 100px;
`;

const Messages: React.FC = () => {
  const arr = new Array(20).fill("");

  return (
    <PosterBox>
      <Header>
        <h3>Name</h3>
        <Butt type="button">
          <MoreVertIcon sx={{ fontSize: "28px" }} />
        </Butt>
      </Header>
      <MessagesBox>
        {arr.map((data, i) => (
          <Message key={i}>
            <p>Hello!</p>
          </Message>
        ))}
      </MessagesBox>
      <SendBox>
        <Div>
          {[<AttachFileIcon />, <HighlightOffIcon />].map((data, i) => (
            <ButtSend2 key={`message_icon_${i}`}>{data}</ButtSend2>
          ))}
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
