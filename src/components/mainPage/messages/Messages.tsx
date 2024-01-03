import React, { useRef } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {
  useGetMessageQuery,
  useHandlerClickKeyMutation,
  useSendMessageMutation,
} from "../../../redux/reducers/http/socketReducer";

const PosterBox = styled.div`
  display: grid;
  height: var(--hight-blok-noHeader);
  grid-template-rows: 44px 1fr auto;
`;

const Header = styled.header`
  padding: 0px 40px 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c69f76;
`;

const Butt = styled.button`
  background-color: transparent;
  border: none;
`;

const SendBox = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 40px;
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
  padding: 8px 3px 1px 3px;
`;

const Div = styled.div`
  background: #ffe7d0;
  display: flex;
  align-items: flex-end;
`;

const MessagesBox = styled.div`
  padding: 15px 40px 2px 20px;
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
  max-width: 500px;
  display: grid;
  grid-template-areas:
    "mess mess ."
    ". . time";
`;

const H3 = styled.h3`
  font-size: 18px;
`;

const P = styled.p`
  grid-area: mess;
`;

const Time = styled.time`
  color: #997a5ed0;
  font-size: 12px;
  justify-self: flex-end;
  grid-area: time;
`;

const Messages: React.FC = () => {
  const [mouse] = useOutletContext() as number[];
  const [trigger] = useSendMessageMutation();
  const [trigger2] = useHandlerClickKeyMutation();
  const { idM } = useParams();
  const [text, setText] = React.useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dialogueData: Array<string> | string =
    idM?.replace(":", "").split("_") ?? "";
  const { data } = useGetMessageQuery();

  React.useEffect((): void => {
    messagesEndRef.current?.scrollIntoView();
  }, [data]);

  React.useEffect((): void => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text, mouse]);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
    trigger2();
  };

  const sendMessage = (): void => {
    if (text.trim().length === 0) return;
    const message = {
      timeSent: new Date(Date.now()).toLocaleString("en-US"),
      message: text,
    };
    trigger({ ...message });
    setText("");
  };

  const correctDate = (date: string): string => {
    const optionDate: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const clientDate = new Date(date).toLocaleTimeString("en-US", optionDate);
    return clientDate;
  };

  return (
    <PosterBox>
      <Header>
        <H3>
          <span>{dialogueData[1]}</span> <span>{dialogueData[2]}</span>
        </H3>
        <Butt type="button">
          <MoreVertIcon sx={{ fontSize: "24px" }} />
        </Butt>
      </Header>
      <MessagesBox>
        {data &&
          data.map(({ message, timeSent }, i) => (
            <Message key={i}>
              <P>{message}</P>
              <Time>{correctDate(timeSent)}</Time>
            </Message>
          ))}
        <div ref={messagesEndRef} />
      </MessagesBox>
      <SendBox>
        <Div>
          {[<AttachFileIcon sx={{ fontSize: "24px" }} />].map((data, i) => (
            <ButtSend key={`message_icon_${i}`}>{data}</ButtSend>
          ))}
        </Div>
        <TextA
          ref={textareaRef}
          onChange={onChange}
          value={text}
          placeholder="send a message"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              return sendMessage();
            }
          }}
        />
        <Div>
          <ButtSend onClick={sendMessage}>
            {text.trim().length !== 0 ? (
              <SendIcon sx={{ fontSize: "24px" }} />
            ) : (
              <></>
            )}
          </ButtSend>
        </Div>
      </SendBox>
    </PosterBox>
  );
};

export default Messages;
