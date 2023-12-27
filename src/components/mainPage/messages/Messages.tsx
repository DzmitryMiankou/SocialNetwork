import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const PosterBox = styled.div`
  display: grid;
  height: var(--hight-blok-noHeader);
  grid-template-rows: 44px 1fr auto;
`;

const Header = styled.div`
  padding: 0px 40px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--block-border);
  background-color: #856c4630;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const SendBox = styled.div`
  display: flex;
`;

const ButtSend = styled(Butt)`
  background-color: transparent;
  border: none;
  display: flex;
  height: auto;
  padding: 6px;
  width: auto;
`;

const TextA = styled.textarea`
  resize: none;
  max-height: 200px;
  width: 100%;
  outline: none;
  background: #ffe7d0;
  border: none;
  font-size: 15px;
  border-left: 1px solid black;
  padding: 6px 5px 2px 5px;
`;

const Div = styled.div`
  background: #ffe7d0;
  display: flex;
  align-items: flex-end;
`;

const MessagesBox = styled.div`
  padding: 15px 40px 2px 20px;
  border-bottom: 1px solid black;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div`
  background-color: #fff0dd;
  padding: 5px 10px;
  width: fit-content;
  min-width: 100px;
  font-size: 14px;
`;

const H3 = styled.h3`
  font-size: 18px;
`;

const Messages: React.FC = () => {
  const [mouse] = useOutletContext() as number[];
  const { idM } = useParams();
  const [text, setText] = React.useState<string>("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const arr = new Array(20).fill("");
  const dialogueData: Array<string> | string =
    idM?.replace(":", "").split("_") ?? "";

  const scrollToBottom = (): void => messagesEndRef.current?.scrollIntoView();
  React.useEffect((): void => {
    scrollToBottom();
  }, []);

  React.useEffect((): void => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text, mouse]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setText(event.target.value);

  return (
    <PosterBox>
      <Header>
        <H3>
          <span>{dialogueData[1]}</span> <span>{dialogueData[2]}</span>
        </H3>
        <Butt type="button">
          <MoreVertIcon sx={{ fontSize: "20px" }} />
        </Butt>
      </Header>
      <MessagesBox>
        {arr.map((data, i) => (
          <Message key={i}>
            <p>Hello!</p>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesBox>
      <SendBox>
        <Div>
          {[<AttachFileIcon sx={{ fontSize: "20px" }} />].map((data, i) => (
            <ButtSend key={`message_icon_${i}`}>{data}</ButtSend>
          ))}
        </Div>
        <TextA
          ref={textareaRef}
          onChange={onChange}
          value={text}
          placeholder="send a message"
        />
        <Div>
          <ButtSend>
            <SendIcon sx={{ fontSize: "24px" }} />
          </ButtSend>
        </Div>
      </SendBox>
    </PosterBox>
  );
};

export default Messages;
