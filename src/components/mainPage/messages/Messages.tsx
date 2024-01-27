import React, { useRef, useState, useEffect } from "react";
import { St } from "./Messages.style";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import {
  MessagesType,
  useHandlerClickKeyMutation,
  useSendMessageMutation,
} from "../../../redux/reducers/http/socketReducer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MessageType } from "../../../redux/reducers/http/socketReducer";
import { LogInitialStateType } from "../../../redux/loginReducer";

const Messages: React.FC = () => {
  const [toScroll, setToScroll] = useState<boolean>(false);
  const [mouse, messages, user]: [number, MessagesType[], LogInitialStateType] =
    useOutletContext();
  const [trigger] = useSendMessageMutation();
  const [trigger2] = useHandlerClickKeyMutation();
  const { idM } = useParams();
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const dialogueData: Array<string> | string =
    idM?.replace(":", "").split("_") ?? "";

  const intoScroll = (): void => messagesEndRef.current?.scrollIntoView();

  useEffect((): void => intoScroll(), [messages]);

  const scrollHandler = (): void => {
    const positionY = messagesEndRef.current?.getBoundingClientRect().y || 0;
    if (positionY > 1500) setToScroll(true);
    else setToScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler, true);
    return () => window.removeEventListener("scroll", scrollHandler, true);
  }, []);

  useEffect((): void => {
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
    const message: MessageType = {
      targetId: +dialogueData[0],
      sourceId: user?.user?.id || 0,
      createdAt: new Date(Date.now()).toLocaleString("en-US"),
      message: text,
      target: {
        firstName: dialogueData[1],
        lastName: dialogueData[2],
      },
      sources: {
        firstName: user?.user?.firstName ?? "",
        lastName: user?.user?.lastName ?? "",
      },
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

  const idUser = user?.user?.id;

  return (
    <St.PosterBox>
      <St.Header>
        <div>
          <St.H3>
            <span>{dialogueData[1]}</span> <span>{dialogueData[2]}</span>
          </St.H3>
          <St.Status>ofline</St.Status>
        </div>
        <St.Butt type="button">
          <MoreVertIcon sx={{ fontSize: "24px" }} />
        </St.Butt>
      </St.Header>
      <St.MessagesBox>
        {messages &&
          messages.map(({ message, id, createdAt, targetId, sourceId }) => (
            <React.Fragment key={id + createdAt}>
              {(+dialogueData[0] === targetId && sourceId === idUser) ||
              (+dialogueData[0] === sourceId && targetId === idUser) ? (
                <St.Message
                  $mouse={mouse}
                  $myId={idUser}
                  $sourceId={sourceId}
                  key={id}
                >
                  <St.P>{message}</St.P>
                  <St.Time>{correctDate(createdAt)}</St.Time>
                </St.Message>
              ) : (
                <></>
              )}
            </React.Fragment>
          ))}
        <div ref={messagesEndRef} />
      </St.MessagesBox>
      <St.SendBox>
        <>
          {toScroll ? (
            <St.ArrowScroll type="button" onClick={intoScroll}>
              <KeyboardArrowDownIcon />
            </St.ArrowScroll>
          ) : (
            <></>
          )}
        </>
        <St.Div>
          {[<AttachFileIcon sx={{ fontSize: "24px" }} />].map((data, i) => (
            <React.Fragment key={i + `-icon_attach_file`}>
              <St.ButtAttach htmlFor="file-input">{data}</St.ButtAttach>
              <input id="file-input" type="file" />
            </React.Fragment>
          ))}
        </St.Div>
        <St.TextA
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
        <St.Div>
          <St.ButtSend onClick={sendMessage}>
            {text.trim().length !== 0 ? (
              <SendIcon sx={{ fontSize: "24px" }} />
            ) : (
              <></>
            )}
          </St.ButtSend>
        </St.Div>
      </St.SendBox>
    </St.PosterBox>
  );
};

export default Messages;
